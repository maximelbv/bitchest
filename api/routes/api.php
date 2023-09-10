<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('/user')->name('user')->controller(\App\Http\Controllers\UserController::class)->group(function () {

    Route::get('/all', 'index');
    Route::get('/{id}', 'show');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');

});

Route::prefix('/currency')->name('currency')->controller(\App\Http\Controllers\CurrencyController::class)->group(function () {

    Route::get('/all', 'index');
    Route::get('/{id}', 'show');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');

});

Route::prefix('/wallet')->name('wallet')->controller(\App\Http\Controllers\WalletController::class)->group(function () {

    Route::get('/user/{userId}/all', 'index');
    Route::get('/user/{userId}/currency/{currencyId}', 'show');
    Route::post('/', 'store');
    Route::put('/{id}', 'update');
    Route::delete('/{id}', 'destroy');

});

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);
});