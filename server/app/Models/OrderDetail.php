<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    public $incrementing = false;
    public $timestamp = false;
    protected $fillable = [
        'order_id', 'product_id', 'unit_price', 'quantity'
    ];
    protected $primaryKey = ['order_id', 'product_id'];
    protected $table = 'order_detail';
}
