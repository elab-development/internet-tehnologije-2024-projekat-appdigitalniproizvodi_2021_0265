<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    
    protected function redirectTo(Request $request): ?string
    {
        if (! $request->expectsJson()) {
            // jer baca gresku u postmanu u suprotnom, ako mi je zahtev api ruta, onda null
            if ($request->is('api/*')) {
                return null;
            }
            return route('login');
        }
        return null;
        }
    }

