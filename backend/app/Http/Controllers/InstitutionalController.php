<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\HandlesUpstreamErrors;
use App\Services\SaintekPublicApiClient;
use Illuminate\Http\JsonResponse;

class InstitutionalController extends Controller
{
    use HandlesUpstreamErrors;

    public function __construct(private SaintekPublicApiClient $saintek)
    {
    }

    public function show(): JsonResponse
    {
        return $this->upstreamResponse(function (): JsonResponse {
            $site = $this->saintek->getSite();

            return response()->json([
                'data' => [
                    'hero' => $site['hero'] ?? null,
                    'features' => $site['features'] ?? null,
                    'visi_misi' => $site['visiMisi'] ?? null,
                    'info' => $site['info'] ?? null,
                ],
            ]);
        });
    }
}
