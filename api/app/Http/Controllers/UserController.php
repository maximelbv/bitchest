<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function store(Request $request) {
        return User::create([
            'email' => $request['email'],
            'role' => $request['role'],
            'password' => Hash::make($request['password'])
        ]);
    }

    public function show (string $id) {
      $user = User::findOrFail($id);
      return response($user, 200);
    }

    public function index () {
      $users = User::all();
      return response($users, 200);
    }

    public function update(string $id, Request $request)
    {
      $user = User::findOrFail($id);
      $user->update($request->all());
      return response([
        'message' => "user " . $user->email . " updated",
        'user' => $user
      ], 200);
    }

    public function destroy (string $id) {
      $user = User::findOrFail($id);
      $user->delete();
      return response([
        'message' => "user " . $user->email . " deleted"
      ], 200);
    }

}
