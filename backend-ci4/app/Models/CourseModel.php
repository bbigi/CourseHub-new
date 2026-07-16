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
        'instructor_id',
        'category_id',
        'title',
        'slug',
        'description',
        'level',
        'thumbnail',
        'status',
        'rejection_reason',
    ];

    protected $validationRules = [
        'instructor_id' => 'required|is_natural_no_zero',
        'category_id' => 'required|is_natural_no_zero',
        'title' => 'required|min_length[3]|max_length[180]',
        'slug' => 'required|min_length[3]|max_length[220]|is_unique[courses.slug,id,{id}]',
        'description' => 'required',
        'level' => 'required|max_length[32]',
        'thumbnail' => 'permit_empty|max_length[255]',
        'status' => 'required|in_list[draft,pending,published,rejected]',
    ];
}
