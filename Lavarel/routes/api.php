<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::group(['middleware'=>'api'], function(){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']); 
});

Route::get('admin/getAllUsers', [UserController::class, 'getAllUsers']);
Route::get('admin/getAllStudents', [UserController::class, 'getAllStudents']);
Route::get('admin/getAllTeachers', [UserController::class, 'getAllTeachers']);
Route::put('admin/changeStatus', [UserController::class, 'changeStatus']);

Route::post('admin/addCourse', [CourseController::class, 'addCourse']);
Route::get('admin/getAllCourses', [CourseController::class, 'getAllCourses']);

// Route::post('teacher/addAnnouncement', [CourseController::class, 'addAnnouncement']);

Route::get('teacher/{id}/getTeachingCourses', [CourseController::class, 'getTeachingCourses']);


Route::post('/course/announcements', [CourseController::class, 'addAnnouncement']);
Route::get('/course/{id}/announcements', [CourseController::class, 'getAnnouncements']);


Route::post('/course/assignments', [CourseController::class, 'addAssignment']);
Route::get('/course/{id}/assignments', [CourseController::class, 'getAssignments']);