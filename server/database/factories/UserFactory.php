<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Type\Integer;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = User::class;
    public function definition()
    {
        return [
            'fullname' => fake()->sentence(3),
            'email' => fake()->unique()->email(),
            'phone_number' => fake()->unique() -> phoneNumber(),
            'address' => fake() -> address(),
            'password' => Hash::make('password'),
        ];
    }
}
