<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\assignment;

class AssignmentController extends Controller
{
    public function addAssignment()
    {
        $credentials = request(['title', 'description', 'due_date', 'max_points', 'course_id']);
        Assignment::create($credentials);
        print_r($credentials);
        return response()->json('success');
    }


    public function getAssignments($id)
    {
        return Assignment::where('course_id', $id)->get();
    }



    public function getAllMyAssignments($id)
    {

    }
}
