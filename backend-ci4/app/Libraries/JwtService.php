<?php

namespace App\Libraries;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use LogicException;
use UnexpectedValueException;

final class JwtService
{
    private string $secret;
    private string $issuer;
    private string $audience;
    private int $ttlSeconds;

    public function __construct()
    {
        $this->secret = trim((string) getenv('JWT_SECRET'));
        $this->issuer = trim((string) (getenv('JWT_ISSUER') ?: 'coursehub-backend'));
        $this->audience = trim((string) (getenv('JWT_AUDIENCE') ?: 'coursehub-frontend'));
        $this->ttlSeconds = (int) (getenv('JWT_TTL_SECONDS') ?: 7200);

        if (strlen($this->secret) < 32) {
            throw new LogicException('JWT configuration is invalid.');
        }

        if ($this->issuer === '' || $this->audience === '' || $this->ttlSeconds < 1) {
            throw new LogicException('JWT configuration is invalid.');
        }
    }

    public function issue(int $userId): array
    {
        $issuedAt = time();

        $token = JWT::encode([
            'iss' => $this->issuer,
            'aud' => $this->audience,
            'iat' => $issuedAt,
            'nbf' => $issuedAt,
            'exp' => $issuedAt + $this->ttlSeconds,
            'sub' => (string) $userId,
        ], $this->secret, 'HS256');

        return [
            'access_token' => $token,
            'expires_in' => $this->ttlSeconds,
        ];
    }

    public function subject(string $token): int
    {
        $claims = JWT::decode($token, new Key($this->secret, 'HS256'));

        if (($claims->iss ?? null) !== $this->issuer || ($claims->aud ?? null) !== $this->audience) {
            throw new UnexpectedValueException('Token issuer or audience is invalid.');
        }

        if (! isset($claims->exp) || ! isset($claims->sub) || ! ctype_digit((string) $claims->sub)) {
            throw new UnexpectedValueException('Token claims are invalid.');
        }

        $userId = (int) $claims->sub;
        if ($userId < 1) {
            throw new UnexpectedValueException('Token subject is invalid.');
        }

        return $userId;
    }
}
