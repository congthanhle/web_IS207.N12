<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Product;
use App\Http\Resources\v1\ProductCollection;
use App\Http\Resources\v1\ProductResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();
        return response()->json($product)->withHeaders(['X-Total-Count' => $product->count()]);
    }

    public function list()
    {
        return Product::query()->where('quantity', '>', 0)->paginate(16);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'cat_id' => 'required',
            'unit_price' => 'required',
            'discount_price',
            'quantity',
            'thumbnail' => 'required|image|mimes:jpg,png,jpeg|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json([$validator], 422);
        } else {
            $product = new Product();
            $product->name = $request->name;
            $product->description = $request->description;
            $product->cat_id = $request->cat_id;
            $product->unit_price = $request->unit_price;
            if ($request->hasFile('thumbmnail')) {
                $thumbmnail = $request->file('thumbmnail');
                $ext = $thumbmnail->getClientOriginalExtension();
                $name = time() . '_' . $ext;
                $thumbmnail->move('uploads/product/', $name);
                $product->thumbnail = 'uploads/product/'.$name;
            } else {
                $product->thumbnail = 'default.jpg';
            }
            $product->save();
            return response()->json([
                'status' => 200,
                'message' => 'product added successfully'
            ]);
            
        }

        // $product = Product::create($request->all());
        // return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::find($id);
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $product = Product::find($id);
        $product->update($request->all());
        return  response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  str $name
     * @return \Illuminate\Http\Response
     */
    public function search(Request $req)
    {
        return Product::where('name', 'like', '%' . $req->name . '%')->paginate(15);
    }

    public function searchCategory($id)
    {
        $product = Product::join('category', 'cat_id', '=', 'category.id')->where('cat_id', $id)->orWhere('parent_id', $id)->select('product.id', 'product.name', 'unit_price', 'thumbnail', 'discount_price')->get();
        return $product;
    }
}
