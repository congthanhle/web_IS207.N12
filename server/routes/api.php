<?php

use App\Http\Controllers\Api\v1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\CategoryController;
use App\Http\Controllers\Api\v1\ProductController;
use App\Http\Controllers\Api\v1\CartController;
use App\Http\Controllers\Api\v1\OrderController;
use App\Http\Controllers\Api\v1\OrderDetailController;
use App\Http\Controllers\Api\v1\SlideController;
use App\Http\Controllers\Api\v1\PostController;
use App\Http\Controllers\Api\v1\FeedbackController;
use App\Http\Controllers\ImageController;





/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Route::get('upload-file', function() {
//     Storage::disk('google')->put('google-drive.txt', 'Google Drive As Filesystem In Laravel (ManhDanBlogs)');
// });

Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('loginAdmin', [AuthController::class, 'loginAdmin']);
    Route::post('test', [AuthController::class, 'getPassword']);
    Route::group(['middleware' => 'cors'], function () {
        Route::get('/post/list', [PostController::class, 'list']);
        Route::get('/productSearch', [ProductController::class, 'search']);
        Route::get('/product/list', [ProductController::class, 'list']);
        Route::get('/product/getCombo', [ProductController::class, 'getCombo']);
        Route::get('/product/getComboList', [ProductController::class, 'getComboList']);
        Route::get('/product/searchCat/{cat}', [ProductController::class, 'searchCategory']);
        Route::get('/product/getCat/{cat}', [ProductController::class, 'getProductCategory']);
        Route::get('/getTopSales', [ProductController::class, 'getTopSales']);
        Route::resource('category', CategoryController::class)->only(['index', 'show']);
        Route::resource('slide', SlideController::class)->only(['index']);
        Route::resource('feedback', FeedbackController::class)->only(['store']);
        Route::resource('product', ProductController::class)->only(['show', 'list', 'index']);
        Route::resource('post', PostController::class)->only(['index', 'list', 'show']);
        Route::put('/cart/updateQuantity/{card_id}/{scope}', [CartController::class, 'updateQuantity']);
        Route::group(['middleware' => ['auth:sanctum']], function () {
            Route::get('/getAmountUser', [UserController::class, 'getAmount']);
            Route::get('/cancelOrder/{id}', [OrderController::class, 'cancelOrder']);
            Route::get('/getAmountOrder', [OrderController::class, 'getAmount']);
            Route::get('/postAmount', [PostController::class, 'getAmount']);
            Route::get('/getRevenueToday', [OrderController::class, 'getRevenueToday']);
            Route::get('/getRevenueMonthly', [OrderController::class, 'getRevenueMonthly']);
            Route::resource('user', UserController::class);
            Route::get('/order/user/{id}', [OrderController::class, 'getOrderUser']);
            Route::resource('post', PostController::class)->except(['index', 'list', 'show']);
            Route::resource('order', OrderController::class);
            Route::resource('slide', SlideController::class)->except(['index']);
            Route::resource('feedback', FeedbackController::class)->except(['store']);
            Route::resource('category', CategoryController::class)->except(['index', 'show']);
            Route::resource('product', ProductController::class)->except(['show', 'list', 'index']);
            Route::resource('cart', CartController::class);
            Route::post('logout', [AuthController::class, 'logout']);
        });
    });
});
