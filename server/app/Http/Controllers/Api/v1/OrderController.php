<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use App\Models\User;
use App\Http\Resources\v1\OrderResource;
use Illuminate\Support\Facades\Mail;


class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->authorize('staff-admin');
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
                'quantity' => $item->quantity,
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
        $user = User::find($request->user_id);
        $name = $user->fullname;
        $address = $user->address;
        $phone = $user->phone_number;
        $order_id = $order->id;
        $order_date = $order->created_at;
        $status = $order->status;
        $total_money = $totalPrice;
       $orderItems = $order->orderItems;
        Mail::send('bill', compact(['name', 'address','phone', 'order_id', 'order_date', 'status', 'total_money', 'orderItems']), function ($email) use($user){
            $email->subject('Hóa đơn điện tử');
            $email->to($user->email, $user->fullname);
        });
        Cart::destroy($cart);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
        $order = Order::with('orderItems')->find($id);
        return $order->toJson();
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
        $this->authorize('staff-admin');
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

    public function getOrderUser($id)
    {
        $order = Order::with('orderItems')->where('user_id', $id)->get();
        return $order->toJson();
    }
    public function getAmount()
    {
        $this->authorize('staff-admin');
        $order = Order::all();
        return $order->count();
    }
    public function getRevenueToday()
    {
        $this->authorize('staff-admin');
        $today = Order::where(Order::raw('date(created_at)'), '>=', Order::raw('date(CURDATE())'))->sum('total_money');
        return $today;
    }

    public function getRevenueMonthly(){
        $this->authorize('staff-admin');
        return Order::select(
            Order::raw('year(created_at) as year'),
            Order::raw('month(created_at) as name'),
            Order::raw('sum(total_money) as Total'),
        )
            ->where(Order::raw('year(created_at)'), '>=', Order::raw('year(CURDATE())'))
            ->groupBy('year')
            ->groupBy('name')
            ->get()
            ->toArray();
    }
}
