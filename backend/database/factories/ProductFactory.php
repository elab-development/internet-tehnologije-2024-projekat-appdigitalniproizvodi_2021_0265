<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(3),
            'price' => $this->faker->randomFloat(2, 10, 500),
            'original_file_path' => 'products/original/' . $this->faker->uuid() . '.pdf',
            'preview_file_path' => 'products/preview/' . $this->faker->uuid() . '.jpg',
        ];
    }
}
