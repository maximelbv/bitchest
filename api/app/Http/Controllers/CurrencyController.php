<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
  public function index () {
    $currencies = Currency::all();
    return response($currencies, 200);
  }

  public function show (string $id) {
    $currency = Currency::findOrFail($id);
    return response($currency, 200);
  }

  public function store(Request $request) {
    $currency = Currency::create([
      'name' => $request['name'],
      'logo_url' => $request['logo_url'],
    ]);
    return response(['message' => $currency->name . " successfully created !"], 200);
  }

  public function update(string $id, Request $request) {
    $currency = Currency::findOrFail($id);
    $currency->update($request->all());
    return response([
      'message' => $currency->name . " updated",
      'currency' => $currency
    ], 200);
  }

  public function destroy (string $id) {
    $currency = Currency::findOrFail($id);
      $currency->delete();
      return response([
        'message' => $currency->name . " deleted"
      ], 200);
  }
}
