<?php

namespace App\Http\Controllers\Concerns;

use Illuminate\Http\JsonResponse;
use RuntimeException;

trait HandlesUpstreamErrors
{
    protected function upstreamResponse(callable $callback): JsonResponse
    {
        try {
            return $callback();
        } catch (RuntimeException $exception) {
            if ($exception->getMessage() === 'upstream_unavailable') {
                return response()->json([
                    'data' => [],
                    'error' => 'upstream_unavailable',
                    'message' => 'Data sementara tidak tersedia. Silakan coba lagi.',
                ], 503);
            }

            throw $exception;
        }
    }
}
