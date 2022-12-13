import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "../../dataTable/dataUser";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Context } from '../../context/Context';
import {URI} from '../../api';

const Datatable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Context);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(`${URI}/user`,{ headers: {"Authorization" : `Bearer ${user.token}`} });
      setUsers(res.data);
      setLoading(false);
    }
    fetchProducts();
    const timerId = setTimeout(fetchProducts, 200);
    return () => clearTimeout(timerId);
  }, []);

  const handleDelete = async (id) => {
    try{
      const res = await axios.delete(`${URI}/user/${id}`,{ headers: {"Authorization" : `Bearer ${user.token}`} })
      setUsers(users.filter((item) => item.id !== id));
  }catch(err){}
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/users/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Users
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
      loading={loading}
        className="datagrid"
        rows={users}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
