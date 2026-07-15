<?php

namespace App\Models;

use CodeIgniter\Model;

class LessonModel extends Model
{
    protected $table = 'lessons';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'course_id',
        'title',
        'content',
        'video_url',
        'order_no',
    ];

    protected $validationRules = [
        'course_id' => 'required|is_natural_no_zero',
        'title' => 'required|min_length[3]|max_length[180]',
        'content' => 'required',
        'video_url' => 'permit_empty|max_length[255]',
        'order_no' => 'required|is_natural_no_zero',
    ];
}
