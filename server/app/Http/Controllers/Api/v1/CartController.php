<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Http\Resources\v1\CartCollection;
use App\Http\Resources\v1\CartResource;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       
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
        
        $request->validate([
            'user_id' =>'required',
            'product_id' =>'required',
            'quantity' =>'required',         
        ]);
        $cart = Cart::where('user_id', $request->user_id)->where('product_id', $request->product_id)->first();
        if($cart != null){
            $cart->update([
                'quantity' => $cart->quantity + $request->quantity
            ]);
        }
        else{
            $cartItem = Cart::create($request->all());
            return new CartResource($cartItem);
        }   
       
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($uid)
    {
        return Cart::where('user_id','like','%'.$uid.'%')->get();
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();
    }

    public function updateQuantity($card_id, $scope){
     
            $cartItem = Cart::where('id',$card_id)->first();
            if($scope == "inc"){
                $cartItem->quantity += 1;
            }else if($scope == "dec"){
                $cartItem->quantity -= 1;
            }
            $cartItem->update();
        
       
    }
    
}
