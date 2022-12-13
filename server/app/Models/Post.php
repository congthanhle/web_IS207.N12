<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Post extends Model
{
    use HasFactory, SoftDeletes, Notifiable;
    public $timestamp = true;
    protected $fillable = [
        'user_id', 'title', 'content', 'thumbnail'
    ];
    protected $primaryKey = 'id';
    protected $table = 'post';
    protected $with = ['user'];
    public function user(){
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
