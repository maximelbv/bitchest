<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Currency;
use App\Models\CurrencyPrice;
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
            'role' => 'admin',
            'balance' => 10000.00
        ]);

        // members
        foreach(range(1, 10) as $index) {
            $user = User::create([
                'email' => $faker->email(),
                'password' => Hash::make('pass'),
                'role' => 'member',
                'balance' => $faker->randomFloat(2, 0.01, 10000.00)
            ]);
        }

        // currencies
        foreach($currencies as $c) {
            Currency::create([
                'name' => $c,
                'logo_url' => '/static/images/'.$c
            ]);
        }

        // currency_prices 
        $allCurrencies = Currency::all();
        $endDate = now();
        foreach($allCurrencies as $c) {
            $startDate = $endDate->copy()->subDays(30);
            while ($startDate <= $endDate) {
                CurrencyPrice::create([
                    'currency_id' => $c->id,
                    'date' => $startDate,
                    'value' => $faker->randomFloat(2, 0.01, 10000.00),
                ]);
                $startDate = $startDate->addDay();
            }

        }
    }
}
