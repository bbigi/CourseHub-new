<?php

namespace App\Models;

use CodeIgniter\Model;

class NotificationModel extends Model
{
    protected $table = 'notifications';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'user_id',
        'type',
        'title',
        'message',
        'read_at',
    ];

    protected $validationRules = [
        'user_id' => 'required|is_natural_no_zero',
        'type' => 'required|max_length[64]',
        'title' => 'required|max_length[160]',
        'message' => 'required',
    ];
}
