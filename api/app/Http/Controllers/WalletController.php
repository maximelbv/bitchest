<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;

class WalletController extends Controller
{
    public function index (string $userId) {
        $wallets = Wallet::where('user_id', $userId)->get();
        return response($wallets, 200);
    }

    public function show (string $userId, string $currencyId) {
        $wallet = Wallet::where([
            ['user_id', $userId],
            ['currency_id', $currencyId]
        ])->get();
        return response($wallet, 200);
    }
  
    public function store(Request $request) {
        $wallet = Wallet::create([
            'user_id' => $request['user_id'],
            'currency_id' => $request['currency_id'],
            'value' => $request['value']
        ]);
        return response(['message' => "Wallet successfully created !", 'wallet' => $wallet], 200);
    }
  
    public function update(string $id, Request $request) {
        $wallet = Wallet::findOrFail($id);
        $wallet->update($request->all());
        return response([
          'message' => "Wallet updated",
          'wallet' => $wallet
        ], 200);
    }
  
    public function destroy (string $id) {
        $wallet = Wallet::findOrFail($id);
        $wallet->delete();
        return response([
          'message' => "Wallet deleted"
        ], 200);
    }
}
