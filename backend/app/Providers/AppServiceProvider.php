<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    
    public function register(): void
    {
        $this->app->bind(\App\Services\ImageUploadService::class, function ($app) {
            return new \App\Services\ImageUploadService();
        });
    }

    
    public function boot(): void
    {
        //
    }
}
