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
       
        Schema::create('order', function (Blueprint $table) {
            $table->bigIncrements('id');          
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('user');
            $table->text('note');
            $table->string('payment'); 
            $table->bigInteger('total_money');
            $table->date('delivery_date');
            $table->set('status', ['Chờ xác nhận','Chờ giao hàng', 'Đang giao hàng', 'Đã giao hàng', 'Hủy giao hàng'])->default('Chờ xác nhận'); 
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
        Schema::dropIfExists('order');
    }
};
