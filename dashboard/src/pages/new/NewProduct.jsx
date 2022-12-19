import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import CKEdit from '../../components/ckEdit/CKEdit';
import Input from '../../components/inputField/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { URI } from '../../api';
import { Context } from '../../context/Context';


const New = ({ inputs, title }) => {
  const [name, setName] = useState("");
  const [cat, setCat] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [cats, setCats] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${URI}/category`);
      setCats(res.data);
    }
    getCats();
    const timerId = setTimeout(getCats, 200);
    return () => clearTimeout(timerId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append('thumbnail', thumbnail);
    dataForm.append('name', name);
    dataForm.append('cat_id', cat);
    dataForm.append('unit_price', price);
    dataForm.append('description', description);
    try {
      const res = await axios.post(`${URI}/product`, dataForm,{ headers: {"Authorization" : `Bearer ${user.token}`} });
      res.data && window.location.replace('/products');
    } catch (e) { }
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
                  Ảnh bìa: <DriveFolderUploadOutlinedIcon className="icon" />
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
                  Tên sản phẩm
                </label>
                <Input data={name} setData={setName} />
                <label htmlFor="cat">
                  Danh mục
                </label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={cat}
                  label="Danh mục gốc"
                  sx={{ minWidth: '100%', mt: 1, mb: 3 }}
                  onChange={(e) => setCat(e.target.value)}
                >
                  {
                    cats.map((item) => (
                      <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>

                    ))
                  }
                </Select>

                <label htmlFor="price">
                  Đơn giá
                </label>
                <Input data={price} setData={setPrice} />


                <CKEdit setText={setDescription} text={description} className="richText" height='500px' fontSize='18px' />
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
