<?php

namespace App\Models;

use CodeIgniter\Model;

class LessonProgressModel extends Model
{
    protected $table = 'lesson_progress';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'enrollment_id',
        'lesson_id',
        'completed_at',
    ];

    protected $validationRules = [
        'enrollment_id' => 'required|is_natural_no_zero',
        'lesson_id' => 'required|is_natural_no_zero',
    ];
}
