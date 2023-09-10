<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Currency;
use App\Models\User;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $currencies = [
            'bitcoin', 
            'etherum', 
            'ripple', 
            'bitcoin_cash', 
            'cardano', 
            'litecoin', 
            'nem', 
            'stellar', 
            'iota', 
            'dash'
        ];

        //admin
        User::create([
            'email' => 'admin@gmail.com',
            'password' => Hash::make('pass'),
            'role' => 'admin'
        ]);

        // members
        foreach(range(1, 10) as $index) {
            User::create([
                'email' => $faker->email(),
                'password' => Hash::make('pass'),
                'role' => 'member'
            ]);
        }

        // currencies
        foreach($currencies as $c) {
            Currency::create([
                'name' => $c,
                'logo_url' => '/static/images/'.$c
            ]);
        }
    }
}
