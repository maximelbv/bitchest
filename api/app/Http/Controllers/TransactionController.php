<?php

namespace App\Http\Controllers;

use App\Models\CurrencyPrice;
use App\Models\Transaction;
use App\Models\Transactions;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index (string $userId) {
        $transactions = Transaction::where('user_id', $userId)->get();
        return response($transactions, 200);
    }
  
    public function store(request $request) {
        $transaction = Transaction::create([
            'user_id' => $request['user_id'],
            'currency_id' => $request['currency_id'],
            'euro_amount' => $request['euro_amount'],
            'transaction_type' => $request['transaction_type']
        ]);
        $user = User::findOrFail($transaction->user_id);

        $wallet = Wallet::where([
            ['user_id', $user->id],
            ['currency_id', $transaction->currency_id]
        ])->first();
        
        $currentCurrencyPrice = CurrencyPrice::where('currency_id', $transaction->currency_id)
        ->orderBy('date', 'desc')
        ->first();

        $amount = $transaction->euro_amount / $currentCurrencyPrice->value;
        

        if ($transaction->transaction_type === 'sell') {
            if ($wallet && $wallet->value >= $amount) {
                $user->balance += $transaction->euro_amount;
                $wallet->value -= $amount;
            } else {
                return response(['message' => "You do not have the necessary funds"], 403);
            }
            
        } elseif ($transaction->transaction_type === 'buy') {
            if ($user->balance >= $transaction->euro_amount) {
                if (!$wallet) {
                    $wallet = Wallet::create([
                        'user_id' => $user->id,
                        'currency_id' => $transaction->currency_id,
                        'value' => $amount
                    ]);
                } else {$wallet->value += $amount;}
                $user->balance -= $transaction->euro_amount;
            } else {
                return response(['message' => "You do not have the necessary funds"], 403);
            }
            
        }

        $wallet->save();
        $user->save();

        return response(['message' => "Transaction successfull", 'transaction' => $transaction], 200);
    }
  
}
