<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Http\Resources\ApplicationResource;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::query();

        // Optional category filter
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $applications = $query->latest()->get();

        return ApplicationResource::collection($applications);
    }
}
