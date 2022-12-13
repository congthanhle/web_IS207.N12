<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;


class Category extends Model
{
    use HasFactory, SoftDeletes, Notifiable;
    public $timestamp = true;
    protected $fillable = [
        'name', 'parent_id', 'cat_code'
    ];
    protected $primaryKey = 'id';
    protected $table = 'category';
    protected $with = ['parent'];
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id', 'id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id', 'id');
    }
}
