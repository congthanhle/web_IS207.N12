<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\v1\CategoryResource;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cat = Category::all();
        return response()->json($cat)->withHeaders(['X-Total-Count' => $cat->count()]);
        
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
        $this->authorize('admin');
        $request->validate([
            'name' =>'required',
            'parent_id',
            'cat_code',
        ]);
       
            // $cat = new Category();
            // $cat->name = $request->name;
            // $cat->parent_id = $request->parent_id;
            // $cat->cat_code = $request->cat_code;
            // $file = $request->file('image.rawFile');
            // $ext = $file->getClientOriginalExtension();
            // $name = time() . '_' . $ext;
            // $file->move('uploads/product/', $name);
            // $cat->thumbnail = $name;
            // return response()->json([
            //     'status' => 200,
            //     'message' => 'Category added successfully'
            // ]);
        
    //     $request->validate([
    //         'name' =>'required',
    //         'parent_id',
    //         'cat_code'
    //     ]);
        $cat = Category::create($request->all());
       return new CategoryResource($cat);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cat = Category::with('children')->find($id);
        return response()->json($cat);
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
        $this->authorize('admin');
        $cat = Category::find($id);
        $cat->update($request->all());
        return  response()->json($cat);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $cat)
    {
        $this->authorize('admin');
        $cat->delete();
    }
}
