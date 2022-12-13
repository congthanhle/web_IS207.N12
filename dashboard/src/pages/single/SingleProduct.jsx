import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import {URI, IMG} from '../../api';

const SingleProduct = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [product,setProduct] = useState({});
    const [cat, setCat] = useState("");

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${URI}/product/` + path);
            setProduct(res.data);
            setCat(res.data.category.name);
        }
        getPost();
        
        const timerId = setTimeout(getPost, 200);
        return () => clearTimeout(timerId);
    }, [path]);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Thông tin sản phẩm</h1>
            <div className="item">
             
              <div className="details">
                <h3 className="itemTitle">{product.name}</h3>
                <div className="detailItem">
                  <span className="itemKey">Danh mục:</span>
                  <span className="itemValue">{cat}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Đơn giá:</span>
                  <span className="itemValue">{product.unit_price}đ</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Khuyến mãi:</span>
                  <span className="itemValue">
                    {product.discount_price}đ
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Số lượng:</span>
                  <span className="itemValue">{product.quantity}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right" style={{display: 'flex', justifyContent: 'center'}}>
          <img
                src={product.thumbnail && `${IMG}/${product.thumbnail}`}
                alt=""
                className="itemImg"
                width='40%'
              />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Mô tả</h1>
        <div className='fs-4' dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
