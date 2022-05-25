<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\assignment;
use App\Models\submission;
use Illuminate\Support\Facades\DB;

class AssignmentController extends Controller
{
    // for teacher! not for submission
    public function addAssignment()
    {
        $credentials = request(['title', 'description', 'due_date', 'max_points', 'course_id']);
        Assignment::create($credentials);

        return response()->json('success');
    }


    public function getAssignments($id)
    {
        return Assignment::where('course_id', $id)->get();
    }



    // public function getAllMyAssignments($id)
    // {

    // }

    // //get all assignments submissions and grades in a course
    // public function getCourseGrades($id){
    //     $grades = DB::select('select name as course_name, stu_name, gra 
    //     from  (
    //             select users.name as stu_name, users.id as stu_id
    //             from takes
    //                 join users on users.id = takes.student_id
    //             where takes.course_id = ?
    //     ) as stu left join submissions as subs 
    //     on subs.student_id=stu.id 
    //     join courses on courses.id=subs.course_id', [$id]);

    //     return $grades;
    // }

    public function getAssignmentGrades($id)
    {
        $grades = DB::select('select users.id as student_id, users.name as student_name, assignments.title, submissions.grade from assignments join takes on assignments.course_id=takes.course_id
        join users on takes.student_id=users.id 
        left JOIN submissions on submissions.student_id=takes.student_id
        where assignments.id= ? ', [$id]);
        return $grades;
    }

    public function submitAssignment()
    {
        $sub = request(['student_id', 'course_id', 'assignment_id', 'answer',]);
        var_dump($sub);
        $sub['grade'] = -1;
        submission::create($sub);
        return response()->json('success');
    }
}
