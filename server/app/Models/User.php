<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Model
{
    use HasFactory, Notifiable, HasApiTokens, SoftDeletes;
    public $timestamp = true;
    
    protected $fillable = [
        'fullname', 'email', 'phone_number', 'address','password', 'role_id'
    ];
    protected $hidden = [
        'password',
        'remember_token'
    ];
    protected $primaryKey = 'id';
    protected $table = 'user';
    public function role(){
        return $this->belongsTo(Role::class);
    }
    public function order(): HasMany
    {
        return $this->hasMany(Order::class, 'user_id', 'id');
    }
    public function orderItems(): HasManyThrough
    {
        return $this->hasManyThrough(Order::class, OrderDetail::class);
    }
}
