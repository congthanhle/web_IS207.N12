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
            'file' => 'required|image',
        ]);
            $file = $request->file('file');
            $name = $request->name;
            $file->move('uploads/product/', $name);
        /* 
            Write Code Here for
            Store $imageName name in DATABASE from HERE 
        */
      
       
    }
}