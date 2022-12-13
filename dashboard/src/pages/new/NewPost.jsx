import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useContext} from "react";
import axios from 'axios';
import CKEdit from '../../components/ckEdit/CKEdit';
import Input from '../../components/inputField/Input';
import { Context } from '../../context/Context';
import {URI} from '../../api';


const New = ({ inputs, tit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const { user } = useContext(Context);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append('thumbnail', thumbnail);
    dataForm.append('title', title);
    dataForm.append('content', content);
    dataForm.append('user_id', user.user.id);
    try {
      const res = await axios.post(`${URI}/post`, dataForm,{ headers: {"Authorization" : `Bearer ${user.token}`} });
      res.data && window.location.replace('/posts');
    } catch (e) { }

    
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Post</h1>
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
                  Thumbnail: <DriveFolderUploadOutlinedIcon className="icon" />
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
                  Tiêu đề
                </label>
                <Input data={title} setData={setTitle} />                
                <label htmlFor="name">
                  Nội dung
                </label>
                <CKEdit setText={setContent} text={content} className="richText" height='400px' fontSize='18px' />
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
