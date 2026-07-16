<?php

namespace App\Policies;

use App\Libraries\AuthContext;

final class CourseOwnershipPolicy
{
    public function allows(array $course): bool
    {
        $user = AuthContext::user();

        return is_array($user)
            && isset($user['id'], $course['instructor_id'])
            && (int) $course['instructor_id'] === (int) $user['id'];
    }
}
