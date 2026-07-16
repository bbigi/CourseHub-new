<?php

namespace App\Models;

use CodeIgniter\Model;

class CertificateModel extends Model
{
    protected $table = 'certificates';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $allowedFields = [
        'user_id',
        'course_id',
        'enrollment_id',
        'certificate_code',
        'issued_at',
    ];

    protected $validationRules = [
        'user_id' => 'required|is_natural_no_zero',
        'course_id' => 'required|is_natural_no_zero',
        'enrollment_id' => 'required|is_natural_no_zero|is_unique[certificates.enrollment_id,id,{id}]',
        'certificate_code' => 'required|max_length[80]|is_unique[certificates.certificate_code,id,{id}]',
    ];
}
