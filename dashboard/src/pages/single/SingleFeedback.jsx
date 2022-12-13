import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect, useContext} from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import { Context } from '../../context/Context';
import { URI } from '../../api';

const SingleFeedback = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [feedback, setFeedback] = useState({});
    const { user } = useContext(Context);
    useEffect(() => {
        const getFeedback = async () => {
            const res = await axios.get(`${URI}/feedback/` + path,{ headers: {"Authorization" : `Bearer ${user.token}`} });
            setFeedback(res.data);
        }
        getFeedback();

        const timerId = setTimeout(getFeedback, 200);
        return () => clearTimeout(timerId);
    }, [path]);
    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <h1 className="title">Thông tin phản hồi</h1>
                        <div className="item">

                            <div className="details">
                                <div className="detailItem">
                                    <span className="itemKey">Tên khách hàng:</span>
                                    <span className="itemValue">{feedback.username}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{feedback.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Số điện thoại:</span>
                                    <span className="itemValue">{feedback.phone_number}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Ngày gửi:</span>
                                    <span className="itemValue">
                                        {moment(feedback.created_at).format('DD/MM/YYYY')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Nội dung</h1>
                    <div className='fs-4'>{feedback.content}</div>
                </div>
            </div>
        </div>
    );
};

export default SingleFeedback;
