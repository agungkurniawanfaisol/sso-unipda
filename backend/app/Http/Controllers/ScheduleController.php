<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesUpstreamErrors;
use App\Http\Resources\ScheduleResource;
use App\Services\OfficePublicApiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    use HandlesUpstreamErrors;

    public function __construct(private OfficePublicApiClient $office)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return $this->upstreamResponse(function () use ($request): JsonResponse {
            $year = $request->integer('year', (int) now()->format('Y'));
            $month = $request->integer('month', (int) now()->format('n'));

            $payload = $this->office->getAcademicCalendar($year, $month);
            $days = $payload['data'] ?? [];

            return response()->json([
                'data' => ScheduleResource::collection(is_array($days) ? $days : []),
                'meta' => [
                    'year' => $year,
                    'month' => $month,
                ],
            ]);
        });
    }
}
