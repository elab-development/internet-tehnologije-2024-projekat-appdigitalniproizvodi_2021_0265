<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'original_file_path',
        'preview_file_path',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];
}
