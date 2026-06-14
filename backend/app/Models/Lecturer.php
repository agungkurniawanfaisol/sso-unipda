<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecturer extends Model
{
    protected $fillable = [
        'name',
        'credentials',
        'specializations',
        'scholar_link',
        'profile_image',
        'bio',
    ];

    protected function casts(): array
    {
        return [
            'specializations' => 'array',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }
}
