<?php
  
namespace App\Http\Controllers;
  
use Illuminate\Http\Request;
  
class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('imageUpload');
    }
      
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
            $file = $request->file('image');
            $name = $request->name;
            $file->move('uploads/product/', $name);
    
        /* 
            Write Code Here for
            Store $imageName name in DATABASE from HERE 
        */
      
       
    }
}