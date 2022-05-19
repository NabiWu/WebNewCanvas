<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\announcement;

class CourseController extends Controller
{

    public function addCourse()
    {
        $credentials = request(['name', 'description', 'capacity', 'teacher_id']);
        Course::create($credentials);

        return response()->json('success');
    }

    public function getAllCourses()
    {
        return Course::all();
    }

    public function getAllAnnouncements($id)
    {
        return Announcement::where('course_id', $id)->get();
    }
}
