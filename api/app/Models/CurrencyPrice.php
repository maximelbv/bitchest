<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrencyPrice extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'currency_id',
        'value',
        'date'
    ];
}
