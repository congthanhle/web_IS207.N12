import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useContext } from "react";
import axios from 'axios';
import Input from '../../components/inputField/Input';
import { URI } from '../../api';
import { Context } from '../../context/Context';


const New = ({ inputs, title }) => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const { user } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append('thumbnail', thumbnail);
    dataForm.append('name', name);
      try{
        const res = await axios.post(`${URI}/slide`, dataForm,{ headers: {"Authorization" : `Bearer ${user.token}`} });
        res.data && window.location.replace('/slides');
    }catch(e){}
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                thumbnail
                  ? URL.createObjectURL(thumbnail)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="formInput">
                <label htmlFor="fileInput">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="formInput" >
                <label htmlFor="name">
                  Tên slide
                </label>
                <Input data={name} setData={setName} />
              </div>
              <button className="sendBtn">Thêm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
