<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class submission extends Model
{
    use HasFactory;
    protected $fillable=[
        'student_id',
        'course_id',
        'assignment_id',
        'answer',
        'grade'
    ];
}
