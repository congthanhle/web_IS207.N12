import moment from 'moment';
export const feedbackColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "Tên khách hàng",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "phone_number",
      headerName: "Số điện thoại",
      width: 150,
    },
    {
      field: "created_at",
      headerName: "Ngày gửi",
      width: 180,
      renderCell: (params) => {
          return (
            <div className="cellWithImg">
             {moment(params.row.created_at).format('DD/MM/YYYY HH:MM')}
            </div>
          );
        },
  },
  ];
  
  
 
  