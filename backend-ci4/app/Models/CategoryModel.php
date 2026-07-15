<?php

namespace App\Models;

use CodeIgniter\Model;

class CategoryModel extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'name',
        'slug',
        'description',
        'status',
    ];

    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[120]',
        'slug' => 'required|min_length[3]|max_length[160]|is_unique[categories.slug,id,{id}]',
        'description' => 'permit_empty',
        'status' => 'required|in_list[active,inactive]',
    ];
}
