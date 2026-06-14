<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesUpstreamErrors;
use App\Http\Resources\StudentResource;
use App\Services\OfficePublicApiClient;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    use HandlesUpstreamErrors;

    public function __construct(private OfficePublicApiClient $office)
    {
    }

    public function index(Request $request): JsonResponse
    {
        return $this->upstreamResponse(function () use ($request): JsonResponse {
            $params = array_filter([
                'page' => $request->integer('page', 1),
                'per_page' => $request->integer('per_page', 24),
                'search' => $request->string('search')->toString() ?: null,
                'study_program' => $request->string('study_program')->toString() ?: null,
                'status' => $request->string('status')->toString() ?: null,
            ], fn ($value) => $value !== null && $value !== '');

            $payload = $this->office->getStudents($params);
            $items = $payload['data'] ?? [];

            return response()->json([
                'data' => StudentResource::collection(is_array($items) ? $items : []),
                'meta' => is_array($payload['meta'] ?? null) ? $payload['meta'] : [],
            ]);
        });
    }
}
