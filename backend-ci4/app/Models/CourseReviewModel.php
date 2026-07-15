<?php

namespace App\Models;

use CodeIgniter\Model;

class CourseReviewModel extends Model
{
    protected $table = 'course_reviews';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'course_id',
        'instructor_id',
        'admin_id',
        'status',
        'submitted_at',
        'reviewed_at',
        'reason',
    ];

    protected $validationRules = [
        'course_id' => 'required|is_natural_no_zero',
        'instructor_id' => 'required|is_natural_no_zero',
        'admin_id' => 'permit_empty|is_natural_no_zero',
        'status' => 'required|in_list[pending,published,rejected]',
    ];
}
