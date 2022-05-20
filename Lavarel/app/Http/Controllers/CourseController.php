<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\announcement;
use App\Models\assignment;

class CourseController extends Controller
{

    public function addCourse()
    {
        $credentials = request(['name', 'description', 'capacity', 'teacher_id']);
        Course::create($credentials);

        return response()->json('success');
    }

    public function addAnnouncement()
    {
        $credentials = request(['title', 'content', 'course_id']);
        Announcement::create($credentials);

        return response()->json('success');
    }



    public function getAllCourses()
    {
        return Course::all();
    }

    public function getAnnouncements($id)
    {
        return Announcement::where('course_id', $id)->get();
    }




    public function getTeachingCourses($id)
    {
        return Course::where('teacher_id', $id)->get();
    }
}
