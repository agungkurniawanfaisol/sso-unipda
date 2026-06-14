<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => config('app.name'),
        'status' => 'ok',
        'endpoints' => [
            'GET /api/applications',
            'GET /api/institutional',
            'GET /api/lecturers',
            'GET /api/lecturers/{ref}',
            'GET /api/students',
            'GET /api/schedules',
            'GET /api/study-programs',
            'GET /api/study-programs/{ref}/lecturers',
            'GET /api/news',
            'GET /api/activities',
        ],
    ]);
});
