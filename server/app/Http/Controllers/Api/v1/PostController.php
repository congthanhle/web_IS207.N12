<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\v1\PostCollection;
use App\Http\Resources\v1\PostResource;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Post::orderBy('created_at', 'desc')->get();
        return response()->json($product)->withHeaders(['X-Total-Count' => $product->count()]);
    }
    public function list()
    {
        return Post::query()->orderBy('created_at', 'desc')->paginate(9);
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
            'title' => 'required',
            'content' => 'required',
            'user_id' => 'required',
            'thumbnail' => 'required|image',
        ]);
        if ($validator->fails()) {
            return response()->json([$validator], 422);
        } else {
            $post = new Post();
            $post->title = $request->title;
            $post->content = $request->content;
            $post->user_id = $request->user_id;
            if ($request->hasFile('thumbnail')) {
                $thumbmnail = $request->file('thumbnail');
                $ext = $thumbmnail->getClientOriginalName();
                $name = time() . '_' . $ext;
                $thumbmnail->move('uploads/post/', $name);
                $post->thumbnail = 'uploads/post/'.$name;
            } else {
                $post->thumbnail = 'default.jpg';
            }
            $post->save();
            return response()->json([
                'status' => 200,
                'message' => 'Post added successfully!'
            ]);
            
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::find($id);
        return response()->json($post);
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
    public function update(Request $request, Post $post)
    {
        $post->update($request->all());
        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
    }
    public function getAmount()
    {
        $post = Post::all();
        return $post->count();
    }
}
