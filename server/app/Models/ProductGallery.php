<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductGallery extends Model
{
    use HasFactory;
    public $timestamp = true;
    protected $fillable = [
        'product_id', 'img_link'
    ];
    protected $primaryKey = 'id';
    protected $table = 'productGallery';
}
