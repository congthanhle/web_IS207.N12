<html lang="en">

<head>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
</head>

<body style="font-size: 15px">

    <hr />
    <div  >
        <span>Khách hàng:</span>
        <span>{{ $name }}</span>
        <div>
            Địa chỉ: {{ $address }}
        </div>
        <div>
            Số điện thoại: {{ $phone }}
        </div>
        <div>
            Số hóa đơn: {{ $order_id }}
        </div>
        <div>
            Ngày đặt: {{ $order_date }}
        </div>
    </div>
    <div >
        <table style="margin-top: 10px">
            <tr style="border: 1px solid black; padding: 10px;">
                <th style="border: 1px solid black; padding: 10px;">Sản phẩm</th>
                <th style="border: 1px solid black; padding: 10px;">Số lượng</th>
                <th style="border: 1px solid black; padding: 10px;">Đơn giá</th>
            </tr>
            @foreach ($orderItems as $orderItem)
                <tr style="border: 1px solid black; padding: 10px;">
                    <td style="border: 1px solid black; padding: 10px;">{{ $orderItem->product->name }}</td>
                    <td style="border: 1px solid black; padding: 10px;">{{ $orderItem->quantity }}</td>
                    <td style="border: 1px solid black; padding: 10px;">{{ $orderItem->unit_price }}</td>
                </tr>
            @endforeach
        </table>
    </div>
    <div style="margin-top: 10px">
        <span >Tạm tính:</span>
        <span>{{ $total_money }}</span>
    </div>
    <div style="margin-top: 10px">
        <span >Phí vận chuyển:</span>
        <span>0</span>
    </div>
    <div style="margin-top: 10px">
        <span style="color:red;">Tổng tiền:</span>
        <span>{{ $total_money }}</span>
    </div>
    <hr />
    <div>
        <span >Cảm ơn đã mua sắm!</span>
    </div>
</body>

</html>
