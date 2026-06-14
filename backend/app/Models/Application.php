<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'image_url',
        'creator_type',
        'profile_link',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function scopeCategory($query, string $category)
    {
        return $query->where('category', $category);
    }
}
