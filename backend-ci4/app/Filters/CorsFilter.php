<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class CorsFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $response = service('response');
        $this->applyCorsHeaders($request, $response);

        if (strtoupper($request->getMethod()) === 'OPTIONS') {
            return $response->setStatusCode(204);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        $this->applyCorsHeaders($request, $response);
    }

    private function applyCorsHeaders(RequestInterface $request, ResponseInterface $response): void
    {
        $requestOrigin = $request->getHeaderLine('Origin');
        $allowedOrigin = $this->resolveAllowedOrigin($requestOrigin);

        if ($allowedOrigin !== '') {
            $response->setHeader('Access-Control-Allow-Origin', $allowedOrigin);
        }

        $response->setHeader('Vary', 'Origin');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->setHeader('Access-Control-Allow-Credentials', 'true');
    }

    private function resolveAllowedOrigin(string $requestOrigin): string
    {
        $configured = getenv('CORS_ALLOWED_ORIGINS') ?: getenv('CORS_ALLOWED_ORIGIN') ?: 'http://localhost:5173';
        $allowedOrigins = array_filter(array_map('trim', explode(',', $configured)));

        if ($requestOrigin !== '' && in_array($requestOrigin, $allowedOrigins, true)) {
            return $requestOrigin;
        }

        return $allowedOrigins[0] ?? '';
    }
}
