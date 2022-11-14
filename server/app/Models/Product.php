<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;



class Product extends Model
{
    use HasFactory, SoftDeletes, Notifiable;
    public $timestamp = true;    public $incrementing = false;
    protected $fillable = [
        'name', 'description', 'cat_id', 'unit_price', 'discount_price', 'quantity','thumbnail'
    ];
    protected $primaryKey = 'id';
    protected $table = 'product';
    public function category(){
        return $this->belongsTo(Category::class, 'cat_id', 'id');
    }
}
