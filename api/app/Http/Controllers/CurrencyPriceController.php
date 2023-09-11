<?php

namespace App\Http\Controllers;

use App\Models\CurrencyPrice;
use Illuminate\Http\Request;

class CurrencyPriceController extends Controller
{
    public function index (string $currencyId) {
        $prices = CurrencyPrice::where('currency_id', $currencyId)->get();
        return response($prices, 200);
      }

    public function showCurrent (string $currencyId) {
        $price = CurrencyPrice::where('currency_id', $currencyId)->orderBy('date', 'desc')->first();
        return response($price, 200);
    }
  
}
