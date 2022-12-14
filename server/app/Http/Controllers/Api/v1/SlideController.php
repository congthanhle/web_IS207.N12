<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slide;
use Illuminate\Support\Facades\Validator;


class SlideController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $slide = Slide::all();
        return response()->json($slide)->withHeaders(['X-Total-Count' => $slide->count()]);
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
        $this->authorize('access');
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'thumbnail' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json([$validator], 422);
        } else {
            $product = new Slide();
            $product->name = $request->name;
            if ($request->hasFile('thumbnail')) {
                $thumbmnail = $request->file('thumbnail');
                $ext = $thumbmnail->getClientOriginalName();
                $name = time() . '_' . $ext;
                $thumbmnail->move('uploads/slide/', $name);
                $product->thumbnail = 'uploads/slide/'.$name;
            } else {
                $product->thumbnail = 'default.jpg';
            }
            $product->save();
            return response()->json([
                'status' => 200,
                'message' => 'product added successfully'
        ]);}
            
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $slide = Slide::find($id);
        return response()->json($slide);
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
        $slide = Slide::find($id);
        $slide->update($request->all());
        return  response()->json($slide);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Slide $slide)
    {
        $this->authorize('admin');
        $slide->delete();
    }
}
