<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function getAllStudents()
    {
        return User::where('role', 'student')->get();
    }

    public function getAllTeachers()
    {
        return User::where('role', 'teacher')->get();
    }


    public function changeStatus()
    {
        $user = User::find(request('id'));
        if ($user->isActive == 'true'){
            $user->isActive = 'false';
        } else {
            $user->isActive = 'true';
        }
        $user->save();

        return response()->json(['message'=>'Status changed'], 200);
    }

    

    public function updateProfile()
    {
        $user = User::find(request('id'));
        $user->name = request('name');
        $user->email = request('email');
        $user->ques1 = request('ques1');
        $user->ques2 = request('ques2');
        $user->ques3 = request('ques3');
        $user->ans1 = request('ans1');
        $user->ans2 = request('ans2');
        $user->ans3 = request('ans3');
        $user->save();

        return response()->json(['message'=>'Status changed'], 200);
    }


}
