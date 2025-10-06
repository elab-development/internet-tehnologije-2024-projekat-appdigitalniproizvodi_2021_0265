<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Obriši postojeće korisnike
        User::query()->delete();

        // Kreiraj samo jednog admin korisnika
        User::create([
            'name' => 'Admin',
            'email' => 'admin@jelisandia.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}
