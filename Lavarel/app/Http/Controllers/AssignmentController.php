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
        print_r($credentials);
        return response()->json('success');
    }


    public function getAssignments($id)
    {
        return Assignment::where('course_id', $id)->get();
    }



    public function getAllMyAssignments($id)
    {
        $assign = DB::select('select courses.id as courseId, assignments.id as assignmentId, courses.name as courseName,  assignments.title as assignmentName,max_points, due_date
        from takes 
        join assignments on takes.course_id=assignments.course_id join courses on courses.id=takes.course_id
        where student_id = ?', [$id]);
        return $assign;
    }

    //get all assignments submissions and grades in a course
    public function getCourseGrades($id)
    {
        $grades = DB::select('select name as course_name, stu_name, gra 
        from  (
                select users.name as stu_name, users.id as stu_id
                from takes
                    join users on users.id = takes.student_id
                where takes.course_id = ?
        ) as stu left join submissions as subs 
        on subs.student_id=stu.id 
        join courses on courses.id=subs.course_id', [$id]);

        return $grades;
    }

    public function getAssignmentGrades($id)
    {
        $grades = DB::select('select users.id as student_id, users.name as student_name, assignments.title, submissions.grade from assignments join takes on assignments.course_id=takes.course_id
        join users on takes.student_id=users.id 
        left JOIN submissions on submissions.student_id=takes.student_id
        where assignments.id= ? ', [$id]);
        return $grades;
    }

    // as student, get my submission Assignment
    public function getMySubmission($sid, $aid)
    {
    }

    //stuId, studentName, submission 
    public function getStudentsSubmission($aid)
    {
        // $sub = DB::select('select users.name, submissions.student_id, grade, submissions.answer from assignments 
        // left join submissions on assignments.id = submissions.assignment_id 
        // left join users on users.id = submissions.student_id
        // where assignments.id = ?;', [$aid]);

        // left join submissions on assignments.id = submissions.assignment_id 
        //         where assignments.id = ? and submissions.assignment_id = ?', [$aid,$aid]
        // right join submissions on users.id = submissions.student_id
        
        $sub = DB::select(' 
            select users.id as student_id, users.name as student_name, assignments.id as ass_id, submissions.answer, submissions.grade
            from users
            inner join takes on users.id = takes.student_id
            inner join assignments on assignments.course_id = takes.course_id
            left join submissions on assignments.id = submissions.assignment_id and submissions.student_id = takes.student_id
            where assignments.id = ?', [$aid]);
        foreach($sub as $item){
            // var_dump($item);
            if ($item->grade!=NULL) {
                if ($item->grade == -1) {
                    unset($item->grade);
                    $item->status = "submitted, not graded";
                    // echo "not graded";
                } else {
                    $item->status = "submitted and graded";
                    // echo $item->grade;
                }
            } else {
                $item->status = "not submitted";
                unset($item->answer);
                unset($item->grade);
                // echo "not submitted;";
            }
            
        }
        return $sub;
    }


    // public function getSubmissionofACourse($cid)
    // {
    //     $sub = DB::select('select users.id as studentId, users.name as studentName, grade from submissions join users on users.id=student_id
    //     where course_id= ? ', [$cid]);

    //     return $sub;
    // }
    public function submitAssignment()
    {
        $sub = request(['student_id', 'course_id', 'assignment_id', 'answer',]);
        $sub['grade'] = -1;
        submission::create($sub);
        return response()->json('success');
    }
}
