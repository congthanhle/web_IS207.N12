export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "fullname",
    headerName: "Họ tên",
    width: 220,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone_number",
    headerName: "Số điện thoại",
    width: 120,
  },
  {
    field: "role_id",
    headerName: "Chức năng",
    width: 200,
    renderCell: (params) => {
      return (
        <div >
            {`${params.row.role.name} (${params.row.role_id})`}
        </div>
      );
    },
  },
];


//temporary data
