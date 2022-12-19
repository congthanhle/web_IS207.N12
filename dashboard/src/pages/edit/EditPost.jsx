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
import { Context } from '../../context/Context';


const EditPost = ({ tit }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [thumbnail, setThumbnail] = useState("");
     const { user } = useContext(Context);


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${URI}/post/` + path);
            setTitle(res.data.title);
            setContent(res.data.content);
            setThumbnail(res.data.thumbnail);
        }
        getPost();
        const timerId = setTimeout(getPost, 200);
        return () => clearTimeout(timerId);
    }, [path]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title,
            content,
        }
        try {
            const res = await axios.put(`${URI}/post/${path}`, data,{ headers: {"Authorization" : `Bearer ${user.token}`} });
            res.data && window.location.replace('/posts');

        } catch (e) { }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{tit}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={thumbnail && `${IMG}/${thumbnail}`}
                            alt=""
                            width= "100%"
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="formInput">
                                <label htmlFor="fileInput">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                {/* <input
                                    type="file"
                                    id="fileInput"
                                    onChange={(e) => setThumbnail(e.target.files[0])}
                                    style={{ display: 'none' }}

                                /> */}
                            </div>
                            <div className="formInput" >
                                <label htmlFor="name">
                                    Tiêu đề
                                </label>
                                <InputUpdate data={title} setData={setTitle} />
                               
                                <label >
                                    Nội dung
                                </label>
                                <CKEdit  setText={setContent} text={content} className="richText" height='400px' fontSize='18px' />
                            </div>


                            <button className="sendBtn">Cập nhật</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
