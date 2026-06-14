<?php

namespace App\Http\Controllers;

use App\Models\Lecturer;
use App\Http\Resources\LecturerResource;
use Illuminate\Http\Request;

class LecturerController extends Controller
{
    public function index(Request $request)
    {
        $lecturers = Lecturer::latest()->get();

        return LecturerResource::collection($lecturers);
    }
}
