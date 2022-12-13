import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";
import { URI, IMG } from '../../api';

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [name, setName] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${URI}/post/` + path);
      setPost(res.data);
      setName(res.data.user.fullname);
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
            <Link to={`/posts/update/${post.id}`} className="editButton" style={{ textDecoration: "none" }}>Edit</Link>
            <h1 className="title">Thông tin bài viết</h1>
            <div className="item">

              <div className="details">
                <h3 className="itemTitle">{post.title}</h3>
                <div className="detailItem">
                  <span className="itemKey">Mã tác giả:</span>
                  <span className="itemValue">{post.user_id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tên tác giả:</span>
                  <span className="itemValue">{name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ngày viết:</span>
                  <span className="itemValue">
                    {moment(post.created_at).format('DD/MM/YYYY')}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Ngày chỉnh sửa:</span>
                  <span className="itemValue">{moment(post.updated_at).format('DD/MM/YYYY')}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right" style={{ display: 'flex', justifyContent: 'center' }}>
            {
              post.thumbnail && <img
                src={`${IMG}/${post.thumbnail}`}
                alt=""
                className="itemImg"
                width='100%'
              />
            }
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Nội dung</h1>
          <div className='fs-4' dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
