<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('credentials'); // e.g., S.Kom., M.Kom.
            $table->json('specializations'); // JSON array of expertise
            $table->string('scholar_link')->nullable();
            $table->string('profile_image')->nullable();
            $table->text('bio')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lecturers');
    }
};
