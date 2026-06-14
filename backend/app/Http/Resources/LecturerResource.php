<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = is_array($this->resource) ? $this->resource : $this->resource->toArray();

        return [
            'id' => $data['id'] ?? $data['public_ref'] ?? null,
            'public_ref' => $data['public_ref'] ?? $data['id'] ?? null,
            'name' => $data['name'] ?? null,
            'credentials' => $data['credentials'] ?? null,
            'specializations' => $data['specializations'] ?? [],
            'scholar_link' => $data['scholar_link'] ?? null,
            'profile_image' => $data['profile_image'] ?? null,
            'bio' => $data['bio'] ?? null,
            'source' => $data['source'] ?? null,
            'faculty' => $data['faculty'] ?? null,
            'program_studi' => $data['program_studi'] ?? null,
        ];
    }
}
