<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    public $timestamp = false;
    public $incrementing = false;
    protected $fillable = [
        'user_id', 'product_id', 'quantity'
    ];
    protected $table = 'cart';
    protected $with = ['product'];
    public function product(){
        return $this->belongsTo(Product::class, 'product_id', 'id');
    }
}
