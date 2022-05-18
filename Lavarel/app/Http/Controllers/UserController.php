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
}
