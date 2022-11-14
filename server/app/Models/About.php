<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;
    public $timestamp = true;
    protected $fillable = [
         'title', 'description', 'thumbnail'
    ];
    protected $primaryKey = 'id';
    protected $table = 'about';
}
