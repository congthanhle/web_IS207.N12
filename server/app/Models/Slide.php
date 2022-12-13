<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamp = true;
    protected $fillable = [
        'name', 'thumbnail', 'status'
    ];
    protected $primaryKey = 'id';
    protected $table = 'slide';
}
