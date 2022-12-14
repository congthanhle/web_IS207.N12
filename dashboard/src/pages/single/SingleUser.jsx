import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import { URI } from '../../api';
import moment from 'moment';
import { Context } from '../../context/Context';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const SingleUser = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [userInfo, setUserInfo] = useState({});
    const [order, setOrder] = useState([]);
    const { user } = useContext(Context);
    const [role, setRole] = useState(0);
    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get(`${URI}/user/` + path, { headers: { "Authorization": `Bearer ${user.token}` } });
            setUserInfo(res.data);
            setOrder(res.data.order)
            setRole(res.data.role_id);
        }
        getUsers();

        const timerId = setTimeout(getUsers, 200);
        return () => clearTimeout(timerId);
    }, [path]);


    const handleClick = (id) => {
        window.location.replace(`/orders/${id}`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            role_id: role
        }
        try {
            const res = await axios.put(`${URI}/user/${path}`, data, { headers: { "Authorization": `Bearer ${user.token}` } });
            res.data && window.location.replace('/users');
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
                        <h1 className="title">Thông tin khách hàng</h1>
                        <div className="item">

                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Tên khách hàng:</span>
                                    <span className="itemValue">{userInfo.fullname}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Địa chỉ:</span>
                                    <span className="itemValue">{userInfo.address}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">
                                        {userInfo.email}
                                    </span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Số điện thoại:</span>
                                    <span className="itemValue">{userInfo.phone_number}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        {
                            user.user.role_id === 2 && <>
                                <h2 className="title">Chức năng</h2>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="Chức năng"
                                    sx={{ minWidth: '100%', mb: 3 }}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <MenuItem value={1}>Khách hàng</MenuItem>
                                    <MenuItem value={2}>Quản trị viên</MenuItem>
                                    <MenuItem value={3}>Nhân viên</MenuItem>
                                </Select>
                                <Button variant="contained" sx={{ color: 'white', backgroundColor: '#ff781f' }} onClick={handleSubmit}>
                                    Cập nhật
                                </Button>
                            </>
                        }

                    </div>
                </div>

                <div className="bottom">
                    <h1 className="title">Danh sách hóa đơn</h1>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell">Mã hóa đơn</TableCell>
                                    <TableCell className="tableCell">Ngày đặt hàng</TableCell>
                                    <TableCell className="tableCell">Hình thức thanh toán</TableCell>
                                    <TableCell className="tableCell">Tổng tiền</TableCell>
                                    <TableCell className="tableCell">Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {order && order.map((item) => (
                                    <TableRow key={item.id} onClick={(e) => handleClick(item.id)}>
                                        <TableCell className="tableCell" >{item.id}</TableCell>
                                        <TableCell className="tableCell">{moment(item.created_at).format('DD/MM/YYYY HH:MM')}</TableCell>
                                        <TableCell className="tableCell">{item.payment}</TableCell>
                                        <TableCell className="tableCell">{item.total_money}</TableCell>
                                        <TableCell className="tableCell">{item.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
            </div>
        </div>
    );
};

export default SingleUser;
