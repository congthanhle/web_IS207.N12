<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    public $timestamp = true;
    protected $fillable = [
        'name', 'parent_id', 'cat_code'
    ];
    protected $primaryKey = 'id';
    protected $table = 'category';
}
