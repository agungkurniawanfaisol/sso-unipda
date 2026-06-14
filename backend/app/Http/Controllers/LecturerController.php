<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesUpstreamErrors;
use App\Http\Resources\LecturerResource;
use App\Services\OfficeLecturerAggregator;
use App\Services\OfficePublicApiClient;
use App\Services\SaintekPublicApiClient;
use App\Support\LecturerNormalizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LecturerController extends Controller
{
    use HandlesUpstreamErrors;

    public function __construct(
        private SaintekPublicApiClient $saintek,
        private OfficePublicApiClient $office,
        private OfficeLecturerAggregator $officeLecturers
    ) {
    }

    public function index(Request $request): JsonResponse
    {
        $source = $request->string('source', 'saintek')->lower()->value();
        $faculty = $request->string('faculty')->lower()->toString() ?: null;

        return $this->upstreamResponse(function () use ($request, $source, $faculty): JsonResponse {
            if ($faculty !== null && $faculty !== 'all') {
                return $this->fromOfficeByFaculty($faculty);
            }

            if ($source === 'office') {
                return $this->fromOfficeByFaculty(null);
            }

            return $this->fromSaintek();
        });
    }

    public function show(string $ref): JsonResponse
    {
        return $this->upstreamResponse(function () use ($ref): JsonResponse {
            $payload = $this->office->getEmployeeByRef($ref);
            $normalized = LecturerNormalizer::fromOfficeDetail($payload);

            return response()->json([
                'data' => new LecturerResource($normalized),
            ]);
        });
    }

    private function fromSaintek(): JsonResponse
    {
        $payload = $this->saintek->getLecturers();
        $items = is_array($payload) ? $payload : [];

        $normalized = array_map(
            fn (array $item): array => LecturerNormalizer::fromSaintek($item, $this->saintek),
            $items
        );

        return response()->json([
            'data' => LecturerResource::collection($normalized),
            'meta' => ['source' => 'saintek', 'faculty' => 'saintek', 'total' => count($normalized)],
        ]);
    }

    private function fromOfficeByFaculty(?string $faculty): JsonResponse
    {
        $normalized = $this->officeLecturers->getByFaculty($faculty);

        return response()->json([
            'data' => LecturerResource::collection($normalized),
            'meta' => [
                'source' => 'office',
                'faculty' => $faculty ?? 'all',
                'total' => count($normalized),
            ],
        ]);
    }
}
