import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import {URI, IMG} from '../../api';
import { Context } from '../../context/Context';


const SingleProduct = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [product,setProduct] = useState({});
    const [cat, setCat] = useState("");
    const [quantity, setQuantity] = useState(0);
    const { user } = useContext(Context);

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
    const handleSubmit = async (e) => {
      e.preventDefault();
      const num = parseInt(product.quantity) + parseInt(quantity);

      const data = {
         quantity: num
      }
      try {
          const res = await axios.put(`${URI}/product/${path}`, data,{ headers: {"Authorization" : `Bearer ${user.token}`} });
          res.data && window.location.replace('/products');
      } catch (e) { }
  }
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
                <div className="detailItem">
                <span className="itemKey">Thêm số lượng:</span>
                <form action="" onSubmit={handleSubmit}>
                <input type="number" min={0} style={{height: '24px'}} value={quantity} onChange={e=>setQuantity(e.target.value)}/>
                 <button type="submit" style={{border: 'none', color: 'white', backgroundColor: '#ff781f', height: '30px', cursor: 'pointer'}}>Nhập kho</button>
                </form>
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
