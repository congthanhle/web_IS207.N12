<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;


class Order extends Model
{
    use HasFactory, HasApiTokens;
    public $timestamp = true;
    protected $fillable = [
        'user_id', 'note', 'payment','total_money', 'status'
    ];
    protected $primaryKey = 'id';
    protected $table = 'order';
    protected $with = ['users'];
    public function users(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderDetail::class, 'order_id', 'id');
    }
}
