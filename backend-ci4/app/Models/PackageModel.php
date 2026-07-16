<?php

namespace App\Models;

use CodeIgniter\Model;

class PackageModel extends Model
{
    protected $table = 'packages';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'name',
        'price',
        'duration_days',
        'description',
        'status',
    ];

    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[120]',
        'price' => 'required|decimal|greater_than_equal_to[0]',
        'duration_days' => 'required|is_natural_no_zero',
        'description' => 'permit_empty',
        'status' => 'required|in_list[active,inactive]',
    ];
}
