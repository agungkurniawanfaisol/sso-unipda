<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category' => $this->category,
            'image_url' => $this->image_url,
            'creator_type' => $this->creator_type,
            'profile_link' => $this->profile_link,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
