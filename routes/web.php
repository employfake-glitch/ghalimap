<?php
use App\Http\Controllers\DirectoryController; use Illuminate\Support\Facades\Route;
Route::get('/',[DirectoryController::class,'home'])->name('home');
Route::get('/province/{province}',[DirectoryController::class,'province'])->name('province.show');
Route::get('/city/{city}',[DirectoryController::class,'city'])->name('city.show');
Route::get('/city/{city}/{location}',[DirectoryController::class,'location'])->name('location.show');