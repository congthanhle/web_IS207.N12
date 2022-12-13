import {IMG} from '../api';
export const productColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "thumbnail",
      headerName: "",
      width: 80,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${IMG}/${params.row.thumbnail}`} alt="avatar" />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Tên sản phẩm",
      width: 280,
    },
    {
      field: "",
      headerName: "Danh mục",
      width: 150,
      renderCell: (params) => {
        return (
          <div >
              {params.row.category.name}
          </div>
        );
      },
    },
    {
      field: "unit_price",
      headerName: "Đơn giá",
      width: 120,
    },
    {
      field: "discount_price",
      headerName: "Khuyến mãi",
      width: 120,
    },
    {
        field: "quantity",
        headerName: "Số lượng",
        width: 90,
      },
  ];
  
  
 
  