import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { orderColumns } from "../../dataTable/dataOrder";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext  } from "react";
import axios from 'axios';
import {URI} from '../../api';
import { Context } from '../../context/Context';

const Datatable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${URI}/order`,{ headers: {"Authorization" : `Bearer ${user.token}`} });
      setOrders(res.data);
      setLoading(false);
    }
    fetchPosts();
    const timerId = setTimeout(fetchPosts, 200);
    return () => clearTimeout(timerId);
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/orders/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  const [sortModel, setSortModel] = useState([
    {
      field: "created_at",
      sort: "desc"
    }
  ]);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Orders
       
      </div>
      
      <DataGrid
        className="datagrid"
        rows={orders}
        columns={orderColumns.concat(actionColumn)}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        loading={loading}
      />
    </div>
  );
};

export default Datatable;
