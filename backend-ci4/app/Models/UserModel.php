<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'name',
        'email',
        'password_hash',
        'role',
        'account_status',
        'instructor_verification_status',
        'rejection_reason',
    ];

    protected $validationRules = [
        'name' => 'required|min_length[3]|max_length[120]',
        'email' => 'required|valid_email|max_length[180]|is_unique[users.email,id,{id}]',
        'password_hash' => 'required|max_length[255]',
        'role' => 'required|in_list[student,instructor,admin]',
        'account_status' => 'required|in_list[active,inactive]',
        'instructor_verification_status' => 'permit_empty|in_list[pending,verified,rejected]',
    ];

    protected $hidden = ['password_hash'];
}
