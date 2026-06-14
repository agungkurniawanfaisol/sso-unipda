<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = is_array($this->resource) ? $this->resource : [];

        return [
            'date' => $data['date'] ?? null,
            'schedules' => collect($data['schedules'] ?? [])->map(fn (array $item): array => [
                'id' => $item['id'] ?? null,
                'subject' => $item['subject'] ?? null,
                'classroom' => $item['classroom'] ?? null,
                'lecturer' => $item['dosen'] ?? null,
                'start_time' => $item['start_time'] ?? null,
                'end_time' => $item['end_time'] ?? null,
                'day_of_week' => $item['day_of_week'] ?? null,
                'notes' => $item['notes'] ?? null,
            ])->values()->all(),
        ];
    }
}
