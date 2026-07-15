<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Domain extends BaseConfig
{
    public const ROLE_STUDENT = 'student';
    public const ROLE_INSTRUCTOR = 'instructor';
    public const ROLE_ADMIN = 'admin';

    public const ACCOUNT_ACTIVE = 'active';
    public const ACCOUNT_INACTIVE = 'inactive';

    public const INSTRUCTOR_PENDING = 'pending';
    public const INSTRUCTOR_VERIFIED = 'verified';
    public const INSTRUCTOR_REJECTED = 'rejected';

    public const COURSE_DRAFT = 'draft';
    public const COURSE_PENDING = 'pending';
    public const COURSE_PUBLISHED = 'published';
    public const COURSE_REJECTED = 'rejected';

    public const PAYMENT_PENDING = 'pending';
    public const PAYMENT_CONFIRMED = 'confirmed';
    public const PAYMENT_REJECTED = 'rejected';

    public const SUBSCRIPTION_PENDING = 'pending';
    public const SUBSCRIPTION_ACTIVE = 'active';
    public const SUBSCRIPTION_EXPIRED = 'expired';
    public const SUBSCRIPTION_REJECTED = 'rejected';

    public const ENROLLMENT_ACTIVE = 'active';
    public const ENROLLMENT_COMPLETED = 'completed';
}
