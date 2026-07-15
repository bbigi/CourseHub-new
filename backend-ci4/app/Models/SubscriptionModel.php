<?php

namespace App\Models;

use CodeIgniter\Model;

class SubscriptionModel extends Model
{
    protected $table = 'subscriptions';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'user_id',
        'package_id',
        'payment_id',
        'start_date',
        'end_date',
        'status',
    ];

    protected $validationRules = [
        'user_id' => 'required|is_natural_no_zero',
        'package_id' => 'required|is_natural_no_zero',
        'payment_id' => 'required|is_natural_no_zero',
        'status' => 'required|in_list[pending,active,expired,rejected]',
    ];
}
