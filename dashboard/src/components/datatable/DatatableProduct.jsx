import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../dataTable/dataProduct";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { URI, IMG } from '../../api'
import { Context } from '../../context/Context';

const Datatable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${URI}/product`);
      setProducts(res.data);
      setLoading(false);

    }
    fetchPosts();
    const timerId = setTimeout(fetchPosts, 200);
    return () => clearTimeout(timerId);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URI}/product/${id}`, { headers: { "Authorization": `Bearer ${user.token}` } })
      setProducts(products.filter((item) => item.id !== id));
    } catch (err) { }

  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/products/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Show</div>
            </Link>
            {
              user.user.role_id === 2 && <>
                <Link to={`/products/update/${params.row.id}`} style={{ textDecoration: "none" }}>
                  <div className="editButton">Edit</div>
                </Link>
                <div
                  className="deleteButton"
                  onClick={() => handleDelete(params.row.id)}
                >
                  Delete
                </div>
              </>
            }

          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Products
        {
          user.user.role_id === 2 && <Link to="/products/new" className="link">
            Add New
          </Link>
        }

      </div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        loading={loading}
      />
    </div>
  );
};

export default Datatable;
