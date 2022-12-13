<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Resources\v1\UserCollection;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\v1\UserResource;



class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return response()->json($user)->withHeaders(['X-Total-Count' => $user->count()]);
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
        $fields = $request->validate([
            'fullname' => 'required|string',
            'email' => 'required|string|unique:user,email',
            'phone_number' => 'required',
            'address' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);
        $user = User::create([
            'fullname' => $fields['fullname'],
            'email' => $fields['email'],
            'phone_number' => $fields['phone_number'],
            'address' => $fields['address'],
            'password' => bcrypt($fields['password']),
        ]);
        $token = $user->createToken('myapptoken')->plainTextToken;

        $respone = [
            'user' => $user,
            'token' => $token
        ];
        return response($respone, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with('order')->find($id);
        return $user->toJson();
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

        $user = User::find($id);
        $user->update($request->all());
        if(!empty($request->password))
        {
            $user->update(['password' => bcrypt($request->password)]);
        }
        return  response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
    }
    public function getAmount()
    {
        $user = User::where('isAdmin', 0)->get();
        return $user->count();
    }
}
