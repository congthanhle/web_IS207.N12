import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/TableOrder";
import moment from 'moment';
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { URI } from '../../api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { Context } from '../../context/Context';


const Single = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [user_1, setUser_1] = useState({});
    const [order, setOrder] = useState({});
    const [status, setStatus] = useState("");
    const [orderDetails, setOrderDetails] = useState([]);
    const { user} = useContext(Context);

    useEffect(() => {
        const getOrder = async () => {
            const res = await axios.get(`${URI}/order/${path}`,{ headers: {"Authorization" : `Bearer ${user.token}`} });
            setOrder(res.data);
            setUser_1(res.data.users);
            setStatus(res.data.status)
            setOrderDetails(res.data.order_items);
        }
        getOrder();
        const timerId = setTimeout(getOrder, 100);
        return () => clearTimeout(timerId);
    }, [path]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            status
        }
        try {
             const res= await axios.put(`${URI}/order/${path}`, data,{ headers: {"Authorization" : `Bearer ${user.token}`} });
            res.data && window.location.replace('/orders');
        } catch (e) {}
    }
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <h1 className="title">Thông tin đơn hàng</h1>
                        <div className="item">
                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Họ tên:</span>
                                    <span className="itemValue">{user_1.fullname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{user_1.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Số điện thoại:</span>
                                    <span className="itemValue">{user_1.phone_number}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Địa chỉ:</span>
                                    <span className="itemValue">{user_1.address}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Ngày đặt hàng:</span>
                                    <span className="itemValue">{moment(order.created_at).format('DD/MM/YYYY HH:MM')}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Hình thức thanh toán:</span>
                                    <span className="itemValue">{order.payment}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Tổng tiền:</span>
                                    <span className="itemValue">{order.total_money}đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <h2 className="title">Trạng thái đơn hàng</h2>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Danh mục gốc"
                            sx={{ minWidth: '100%', mb: 3 }}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Chờ xác nhận">Chờ xác nhận</MenuItem>
                            <MenuItem value="Đang giao hàng">Đang giao hàng</MenuItem>
                            <MenuItem value="Giao hàng thành công">Giao hàng thành công</MenuItem>
                        </Select>
                        <Button variant="contained" sx={{ color: 'white', backgroundColor: '#ff781f' }} onClick={handleSubmit}>
                            Cập nhật
                        </Button>
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Chi tiết đơn hàng</h1>
                    
                    <List item={orderDetails} />
                </div>
            </div>
        </div>
    );
};

export default Single;
