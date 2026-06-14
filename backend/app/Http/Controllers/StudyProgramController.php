<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesUpstreamErrors;
use App\Services\OfficePublicApiClient;
use Illuminate\Http\JsonResponse;

class StudyProgramController extends Controller
{
    use HandlesUpstreamErrors;

    public function __construct(private OfficePublicApiClient $office)
    {
    }

    public function index(): JsonResponse
    {
        return $this->upstreamResponse(function (): JsonResponse {
            $payload = $this->office->getStudyPrograms();

            return response()->json([
                'data' => $payload['data'] ?? [],
            ]);
        });
    }

    public function lecturers(string $ref): JsonResponse
    {
        return $this->upstreamResponse(function () use ($ref): JsonResponse {
            $payload = $this->office->getStudyProgramLecturers($ref);

            return response()->json([
                'data' => $payload['data'] ?? $payload,
            ]);
        });
    }
}
