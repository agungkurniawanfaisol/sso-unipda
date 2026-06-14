<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        if (is_array($this->resource)) {
            return [
                'id' => $this->resource['id'] ?? null,
                'title' => $this->resource['title'] ?? null,
                'description' => $this->resource['description'] ?? null,
                'category' => $this->resource['category'] ?? null,
                'image_url' => $this->resource['image_url'] ?? null,
                'creator_type' => $this->resource['creator_type'] ?? null,
                'profile_link' => $this->resource['profile_link'] ?? null,
                'faculty' => $this->resource['faculty'] ?? null,
                'featured' => (bool) ($this->resource['featured'] ?? false),
                'source' => $this->resource['source'] ?? 'showcase',
                'created_at' => $this->resource['created_at'] ?? null,
                'updated_at' => $this->resource['updated_at'] ?? null,
            ];
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'image_url' => $this->image_url,
            'creator_type' => $this->creator_type,
            'profile_link' => $this->profile_link,
            'source' => 'database',
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
