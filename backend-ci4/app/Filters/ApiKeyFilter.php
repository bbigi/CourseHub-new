<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class ApiKeyFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $expectedKey = getenv('COURSEHUB_API_KEY') ?: 'coursehub-local-api-key';
        $providedKey = $request->getHeaderLine('X-API-KEY');

        if (!hash_equals($expectedKey, $providedKey)) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON([
                    'status' => false,
                    'message' => 'Unauthorized. Invalid or missing X-API-KEY header.',
                ]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
