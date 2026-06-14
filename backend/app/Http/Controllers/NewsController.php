<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesUpstreamErrors;
use App\Services\SaintekPublicApiClient;
use Illuminate\Http\JsonResponse;

class NewsController extends Controller
{
    use HandlesUpstreamErrors;

    public function __construct(private SaintekPublicApiClient $saintek)
    {
    }

    public function index(): JsonResponse
    {
        return $this->upstreamResponse(function (): JsonResponse {
            $payload = $this->saintek->getNews();

            return response()->json([
                'data' => $payload,
            ]);
        });
    }
}
