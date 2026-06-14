<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\InstitutionalController;
use App\Http\Controllers\LecturerController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudyProgramController;
use Illuminate\Support\Facades\Route;

Route::get('/applications', [ApplicationController::class, 'index']);
Route::get('/faculties', [FacultyController::class, 'index']);
Route::get('/institutional', [InstitutionalController::class, 'show']);
Route::get('/lecturers', [LecturerController::class, 'index']);
Route::get('/lecturers/{ref}', [LecturerController::class, 'show']);
Route::get('/students', [StudentController::class, 'index']);
Route::get('/schedules', [ScheduleController::class, 'index']);
Route::get('/study-programs', [StudyProgramController::class, 'index']);
Route::get('/study-programs/{ref}/lecturers', [StudyProgramController::class, 'lecturers']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('/activities', [ActivityController::class, 'index']);
