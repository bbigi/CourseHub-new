<?php

namespace App\Models;

use CodeIgniter\Model;

class CourseModel extends Model
{
    protected $table = 'courses';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'title',
        'slug',
        'category',
        'description',
        'level',
        'price',
        'status',
        'instructor_id',
        'thumbnail',
    ];

    protected $validationRules = [
        'title' => 'required|min_length[3]|max_length[150]',
        'slug' => 'required|min_length[3]|max_length[180]',
        'category' => 'required|max_length[80]',
        'description' => 'required',
        'level' => 'required|in_list[pemula,menengah,lanjutan]',
        'price' => 'permit_empty|decimal',
        'status' => 'required|in_list[draft,published,archived]',
        'instructor_id' => 'required|is_natural_no_zero',
        'thumbnail' => 'permit_empty|max_length[255]',
    ];
}
