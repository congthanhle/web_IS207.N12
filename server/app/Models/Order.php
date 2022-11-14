<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    public $timestamp = true;
    protected $fillable = [
        'user_id', 'note', 'payment','total_money', 'status'
    ];
    protected $primaryKey = 'id';
    protected $table = 'order';
    
    public function orderItems(){
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }
}
