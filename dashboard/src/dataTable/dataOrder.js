import moment from 'moment';
export const orderColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
        field: "user_id",
        headerName: "Mã khách hàng",
        width: 120,
    },
    {
        field: "created_at",
        headerName: "Ngày đặt hàng",
        width: 180,
        renderCell: (params) => {
            return (
              <div className="cellWithImg">
               {moment(params.row.created_at).format('DD/MM/YYYY HH:MM')}
              </div>
            );
          },
    },
    {
        field: "payment",
        headerName: "Hình thức thanh toán",
        width: 180,
    },
    {
        field: "total_money",
        headerName: "Tổng tiền",
        width: 150,
    },
    {
        field: "status",
        headerName: "Trạng thái",
        width: 180,
    },
];



