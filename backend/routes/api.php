<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\LecturerController;

Route::get('/applications', [ApplicationController::class, 'index']);
Route::get('/lecturers', [LecturerController::class, 'index']);
