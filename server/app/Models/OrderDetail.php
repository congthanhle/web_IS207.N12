<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class OrderDetail extends Model
{
    use HasFactory, Notifiable;
    public $incrementing = false;
    public $timestamp = false;
    protected $fillable = [
        'order_id', 'product_id', 'unit_price', 'quantity'
    ];
    protected $table = 'order_detail';
    protected $with = ['product', 'order'];                             
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
    public function order() : BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }
}
