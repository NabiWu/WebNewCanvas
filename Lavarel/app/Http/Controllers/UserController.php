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


    public function changeStatus($id)
    {
        $user = User::find($id);
        if ($user->isActive == 'true'){
            $user->isActive = 'false';
        } else {
            $user->isActive = 'true';
        }

        return response()->json(['message'=>'Status changed'], 200);
    }
}
