<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    public $timestamp = true;
    protected $fillable = [
        'user_id', 'title', 'content', 'thumbnail'
    ];
    protected $primaryKey = 'id';
    protected $table = 'post';
}
