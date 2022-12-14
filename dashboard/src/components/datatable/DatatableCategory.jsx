import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { categoryColumns } from "../../dataTable/dataCategory";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { URI } from '../../api';
import { Context } from '../../context/Context';


const Datatable = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get(`${URI}/category`);
      setCategories(res.data);
      setLoading(false);
    }
    fetchCats();
    const timerId = setTimeout(fetchCats, 100);
    return () => clearTimeout(timerId);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URI}/category/${id}`, { headers: { "Authorization": `Bearer ${user.token}` } })
      setCategories(categories.filter((item) => item.id !== id));
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
            <Link to={`/categories/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {
              user.user.role_id === 2 && <>
                <Link to={`/categories/update/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Categories
        {
          user.user.role_id === 2 && <Link to="/categories/new" className="link">
            Add New
          </Link>
        }

      </div>

      <DataGrid
        className="datagrid"
        rows={categories}
        columns={categoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        loading={loading}
      />
    </div>
  );
};

export default Datatable;
