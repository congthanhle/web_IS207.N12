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
        Schema::create('order_detail', function (Blueprint $table) {         
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->primary(['order_id', 'product_id']);
            $table->foreign('order_id')->references('id')->on('order');
            $table->foreign('product_id')->references('id')->on('product'); 
            $table->bigInteger('unit_price');
            $table->integer('quantity'); 
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
        Schema::dropIfExists('order_detail');
    }
};
