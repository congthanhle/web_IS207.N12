<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->text('description');
            $table->unsignedBigInteger('cat_id')->nullable();
            $table->foreign('cat_id')->references('id')->on('category');
            $table->bigInteger('unit_price');
            $table->bigInteger('discount_price')->default(0);
            $table->integer('quantity')->default(0);      
            $table->string('thumbnail', 255);   
            $table->softDeletes('deleted_at', $precision = 0);
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product');
    }
};
