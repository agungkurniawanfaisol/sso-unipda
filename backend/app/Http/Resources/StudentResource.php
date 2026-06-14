<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = is_array($this->resource) ? $this->resource : [];

        return [
            'id' => $data['id'] ?? null,
            'nim' => $data['nim'] ?? null,
            'name' => $data['nama_lengkap'] ?? null,
            'semester' => $data['semester'] ?? null,
            'entry_year' => $data['tahun_masuk'] ?? null,
            'status' => $data['status'] ?? null,
            'photo' => $data['foto'] ?? null,
            'study_program' => $data['study_program'] ?? null,
        ];
    }
}
