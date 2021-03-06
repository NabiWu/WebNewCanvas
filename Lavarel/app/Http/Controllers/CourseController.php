<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\take;
use App\Models\announcement;
use Illuminate\Support\Facades\DB;
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

    //for students, get Announcements for all taken courses
    public function getAllMyAnnouncements($id)
    {
        $annsData = DB::select('select courses.name as courseName, title, content, anns.created_at as created_at
        from announcements as anns join courses on anns.course_id=courses.id
        where anns.course_id in (
                select course_id
                from users
                    join takes on users.id = takes.student_id
                where users.id = ?
        )', [$id]);
        return $annsData;
    }

    //for a student, get all taken courses
    public function getAllMyCourses($id)
    {
        $courses = DB::select('select courses.id, courses.name 
        from takes join courses on takes.course_id=courses.id 
        where takes.student_id = ?', [$id]);
        return $courses;
    }

    public function getAllStudentsByCourseId($id)
    {

        $students = DB::table('takes')
            ->join("users", "users.id", "=", "takes.student_id")
            ->where('course_id', $id)
            ->select('role', 'name', 'email', 'student_id')
            ->get();
        return $students;
    }
    // TODO
    public function addStudent($course_id, $student_id)
    {
        $size = $this->getCourseSize($course_id);
        $capacity = $this->getCourseCapacity($course_id);
        if ($capacity <= $size) {
            return response()->json('fail');
        } else {
            DB::table('takes')->insert([['course_id' => $course_id, 'student_id' => $student_id]]);
            return response()->json('success');
        }
    }




    public function getTeachingCourses($id)
    {
        return Course::where('teacher_id', $id)->get();
    }

    private function getCourseSize($id)
    {
        $size = DB::table('takes')
            ->where('course_id', $id)
            ->join("users", "users.id", "=", "takes.student_id")
            ->count();
        return $size;
    }

    private function getCourseCapacity($id)
    {
        $capacity = DB::table('courses')
            ->where('id', $id)
            ->select('capacity')
            ->get();
        return $capacity[0]->capacity;
    }
}
