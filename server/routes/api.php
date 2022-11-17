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
use App\Http\Controllers\Api\v1\SlideController;
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
Route::controller(ImageController::class)->group(function(){
    Route::get('image-upload', 'index');
    Route::post('imageUpload', 'store');
});
Route::prefix('v1')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/productSearch', [ProductController::class, 'search']);
    Route::get('/product/list', [ProductController::class, 'list']);
    Route::get('/product/searchCat/{cat}', [ProductController::class, 'searchCategory']);
    Route::resource('user', UserController::class);
    Route::resource('order', OrderController::class);
    Route::resource('orderDetail', OrderDetailController::class);
    Route::resource('cart', CartController::class);
    Route::resource('slide', SlideController::class);
    Route::put('/cart/updateQuantity/{card_id}/{scope}', [CartController::class, 'updateQuantity']);
    Route::resource('category', CategoryController::class)->only(['store', 'update', 'destroy']);
            Route::resource('product', ProductController::class)->only(['store', 'update', 'destroy']);  
    Route::group(['middleware' => 'cors'], function () {
        // Route::resource('user', UserController::class);
        Route::resource('category', CategoryController::class);
        Route::resource('product', ProductController::class);


        Route::group(['middleware' => ['auth:sanctum']], function () {
          
            
           
           
            // Route::resource('about', ProductController::class)->only(['store', 'update', 'destroy']);      
            // Route::resource('slide', ProductController::class)->only(['store', 'update', 'destroy']);      
            // Route::resource('post', ProductController::class)->only(['store', 'update', 'destroy']);   
            // Route::resource('feedback', ProductController::class);   


        });
    });
});