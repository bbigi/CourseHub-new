<?php

namespace App\Libraries;

final class AuthContext
{
    private static ?array $user = null;

    public static function setUser(array $user): void
    {
        self::$user = $user;
    }

    public static function user(): ?array
    {
        return self::$user;
    }

    public static function clear(): void
    {
        self::$user = null;
    }
}
