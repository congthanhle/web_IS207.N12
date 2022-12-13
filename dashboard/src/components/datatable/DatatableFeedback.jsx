import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { feedbackColumns } from "../../dataTable/dataFeedback";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Context } from '../../context/Context';
import {URI} from '../../api';

const Datatable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortModel, setSortModel] = useState([
    {
      field: "created_at",
      sort: "desc"
    }
  ]);
  const { user } = useContext(Context);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const res = await axios.get(`${URI}/feedback`,{ headers: {"Authorization" : `Bearer ${user.token}`} });
      setFeedbacks(res.data);
      setLoading(false);
    }
    fetchFeedbacks();
    const timerId = setTimeout(fetchFeedbacks, 200);
    return () => clearTimeout(timerId);
  }, []);

  const handleDelete = async (id) => {
    try{
      const res = await axios.delete(`${URI}/feedback/${id}`,{ headers: {"Authorization" : `Bearer ${user.token}`} })
      setFeedbacks(feedbacks.filter((item) => item.id !== id));
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
            <Link to={`/feedbacks/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        Feedbacks
      </div>
      
      <DataGrid
        className="datagrid"
        rows={feedbacks}
        sortModel={sortModel}
        columns={feedbackColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        loading={loading}
      />
    </div>
  );
};

export default Datatable;
