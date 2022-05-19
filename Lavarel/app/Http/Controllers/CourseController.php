<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\take;
use App\Models\announcement;
use Illuminate\Support\Facades\DB;

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

    public function getAllStudentsByCourseId($id) 
    {
        echo($id);
        // $users = DB::table('users')
        //     ->join('contacts', 'users.id', '=', 'contacts.user_id')
        //     ->join('orders', 'users.id', '=', 'orders.user_id')
        //     ->select('users.*', 'contacts.phone', 'orders.price')
        //     ->get();
        // $students = take::where('course_id', $id)::join("users","users.id","=","take.student_id")->get();

        $students = DB::table('takes')
                    ->select('course_id', $id)
                    ->join("users","users.id","=","takes.student_id")
                    ->get();
        return $students;
    }
}
