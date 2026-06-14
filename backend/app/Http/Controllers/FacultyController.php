<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use RuntimeException;

class FacultyController extends Controller
{
    public function index(): JsonResponse
    {
        $path = config('unipda.faculties_path', config_path('faculties.json'));

        if (! is_readable($path)) {
            throw new RuntimeException("Faculties config not found: {$path}");
        }

        $payload = json_decode((string) file_get_contents($path), true);

        return response()->json([
            'data' => $payload['faculties'] ?? [],
        ]);
    }
}
