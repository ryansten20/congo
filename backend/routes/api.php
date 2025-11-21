<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

// ============================================
// AUTHENTICATION ROUTES 
// ============================================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

// ============================================
// PRODUCT ROUTES 
// ============================================
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/categories', [ProductController::class, 'categories']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::post('/products/by-ids', [ProductController::class, 'getByIds']);
Route::get('/products/category/{category}', [ProductController::class, 'getByCategory']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// ============================================
// ORDER ROUTES 
// ============================================
Route::post('/orders', [OrderController::class, 'checkout']);
Route::get('/orders/{id}', [OrderController::class, 'show']);
Route::get('/orders/user/{userId}', [OrderController::class, 'getByUserId']);
Route::get('/orders/status/{status}', [OrderController::class, 'getByStatus']);