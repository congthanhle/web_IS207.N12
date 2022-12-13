<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Feedback extends Model
{
    use HasFactory, SoftDeletes;
    public $timestamp = true;
    protected $fillable = [
        'username','email','phone_number', 'content', 'status'
    ];
    protected $primaryKey = 'id';
    protected $table = 'feedback';
}
