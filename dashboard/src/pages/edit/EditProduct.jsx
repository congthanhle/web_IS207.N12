import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import { URI, IMG } from '../../api';
import CKEdit from '../../components/ckEdit/CKEdit';
import InputUpdate from '../../components/inputField/InputUpdate';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Context } from '../../context/Context';


const EditProduct = ({ title }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const [name, setName] = useState("");
    const [cat, setCat] = useState('');
    const [price, setPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");
    const [thumbnail, setThumbnail] = useState("");
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

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${URI}/product/` + path);
            setName(res.data.name);
            setDescription(res.data.description);
            setCat(res.data.cat_id);
            setPrice(res.data.unit_price);
            setDiscountPrice(res.data.discount_price);
            setQuantity(res.data.quantity);
            setThumbnail(res.data.thumbnail);
        }
        getPost();
        const timerId = setTimeout(getPost, 200);
        return () => clearTimeout(timerId);
    }, [path]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            description,
            cat_id: cat,
            unit_price: price,
            discount_price: discountPrice,
            quantity
        }
        try {
            const res = await axios.put(`${URI}/product/${path}`, data,{ headers: {"Authorization" : `Bearer ${user.token}`} });
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
                        {
                            thumbnail && <img
                                src={`${IMG}/${thumbnail}`}
                                alt=""
                            />
                        }
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
                                    Tên sản phẩm
                                </label>
                                <InputUpdate data={name} setData={setName} />
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
                                <InputUpdate data={price} setData={setPrice} />
                                <label htmlFor="price">
                                    Giảm giá
                                </label>
                                <InputUpdate data={discountPrice} setData={setDiscountPrice} />
                                <label htmlFor="price">
                                    Số lượng
                                </label>
                                <InputUpdate data={quantity} setData={setQuantity} />

                                <CKEdit setText={setDescription} text={description} className="richText" height='400px' fontSize='18px' />
                            </div>
                            <button className="sendBtn">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
