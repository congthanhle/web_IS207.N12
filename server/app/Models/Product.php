<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class Product extends Model
{
    use HasFactory, SoftDeletes, Notifiable, HasApiTokens;
    public $timestamp = true;    public $incrementing = false;
    protected $fillable = [
        'name', 'description', 'cat_id', 'unit_price', 'discount_price', 'quantity','thumbnail'
    ];
    protected $primaryKey = 'id';
    protected $table = 'product';
    protected $with = ['category'];
    public function category(){
        return $this->belongsTo(Category::class, 'cat_id', 'id');
    }
}
