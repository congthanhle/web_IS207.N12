<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $fields = $request->validate([
            'fullname' =>'required|string',
            'email' =>'required|string|unique:user,email',
            'phone_number' =>'required',
            'address' =>'required|string',
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

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Bad creds'
            ], 401);
        }
        $user->save();
        $token = $user->createToken('myapptoken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    public function logout(Request $request) {
        Auth::user()->tokens->each(function($token, $key) {
            $token->delete();
        });
    
        return response()->json('Successfully logged out');
    }
}

