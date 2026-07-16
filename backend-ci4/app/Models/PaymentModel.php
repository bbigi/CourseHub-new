<?php

namespace App\Models;

use CodeIgniter\Model;

class PaymentModel extends Model
{
    protected $table = 'payments';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'user_id',
        'package_id',
        'transaction_number',
        'payment_method',
        'payment_date',
        'amount',
        'status',
        'confirmed_by',
        'confirmed_at',
        'rejection_reason',
    ];

    protected $validationRules = [
        'user_id' => 'required|is_natural_no_zero',
        'package_id' => 'required|is_natural_no_zero',
        'transaction_number' => 'required|max_length[80]|is_unique[payments.transaction_number,id,{id}]',
        'payment_method' => 'required|max_length[80]',
        'amount' => 'required|decimal|greater_than_equal_to[0]',
        'status' => 'required|in_list[pending,confirmed,rejected]',
        'confirmed_by' => 'permit_empty|is_natural_no_zero',
    ];
}
