<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;
    public $timestamp = true;
    protected $fillable = [
        'fullname', 'email', 'phone_number', 'address','password', 'isAdmin',
    ];
    protected $hidden = [
        'password',
        'remember_token'
    ];
    protected $primaryKey = 'id';
    protected $table = 'user';
}
