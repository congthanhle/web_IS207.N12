<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use App\Http\Resources\v1\OrderCollection;
use App\Http\Resources\v1\OrderResource;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $order = Order::all();
        return response()->json($order)->withHeaders(['X-Total-Count' => $order->count()]);
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
        $order = new Order;
        $order->user_id = $request->user_id;
        $order->note = $request->note;
        $order->payment = $request->payment;
        $order->total_money = 0;
        $order->save();

        $cart = Cart::where('user_id', $request->user_id)->get();
        
        $cartItems = [];
        
        $totalPrice = 0;
        foreach($cart as $item){
            $cartItems[] = [
                'product_id' => $item->product_id,
                'unit_price' => $item->product->unit_price,
                'quantity' => $item->quantity
                
            ];
            $item->product->update([
                'quantity' => $item->product->quantity - $item->quantity
            ]);
           $totalPrice += $item->quantity * $item->product->unit_price; 
        }
        
        
        $order->update([
            'total_money' => $totalPrice
        ]);
        $order->orderItems()->createMany($cartItems);
        Cart::destroy($cart);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($uid)
    {
        
        return Order::where('user_id',$uid)->get();
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
    public function update(Request $request, Order $order)
    {
        $order->update($request->all());
        return new OrderResource($order);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();
    }
}
