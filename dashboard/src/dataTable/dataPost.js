import {IMG} from '.././api/index';
export const postColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "thumbnail",
      headerName: "",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={`${IMG}/${params.row.thumbnail}`} alt={`post ${params.row.id}`} />
          </div>
        );
      },
    },
    {
        field: "",
        headerName: "Tác giả",
        width: 200,
        renderCell: (params) => {
            return (
              <div className="cellWithImg">
               {params.row.user.fullname}
              </div>
            );
          },
    },
    {
        field: "title",
        headerName: "Tiêu đề",
        width: 500,
    },
];



