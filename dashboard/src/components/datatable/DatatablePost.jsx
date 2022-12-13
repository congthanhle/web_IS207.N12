import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { postColumns } from "../../dataTable/dataPost";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { URI } from '../../api';
import { Context } from '../../context/Context';

const Datatable = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${URI}/post`);
      setPosts(res.data);
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
            <Link to={`/posts/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={`/posts/update/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="editButton">Edit</div>
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
  const [sortModel, setSortModel] = useState([
    {
      field: "created_at",
      sort: "desc"
    }
  ]);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${URI}/post/${id}`,{ headers: {"Authorization" : `Bearer ${user.token}`} })
      setPosts(posts.filter((item) => item.id !== id));
    } catch (err) { }
  }
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Posts
        <Link to="/posts/new" className="link">
          Add New
        </Link>
      </div>

      <DataGrid
        className="datagrid"
        rows={posts}
        columns={postColumns.concat(actionColumn)}
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
