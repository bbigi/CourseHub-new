<?php

namespace App\Models;

use CodeIgniter\Model;

class EnrollmentModel extends Model
{
    protected $table = 'enrollments';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = false;

    protected $allowedFields = [
        'user_id',
        'course_id',
        'status',
        'progress',
        'enrolled_at',
        'completed_at',
    ];

    protected $validationRules = [
        'user_id' => 'required|is_natural_no_zero',
        'course_id' => 'required|is_natural_no_zero',
        'status' => 'permit_empty|in_list[aktif,selesai,dibatalkan]',
        'progress' => 'permit_empty|integer|greater_than_equal_to[0]|less_than_equal_to[100]',
    ];
}
