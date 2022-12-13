import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router';
import axios from 'axios';
import { URI } from '../../api';
import InputUpdate from '../../components/inputField/InputUpdate';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Context } from '../../context/Context';


const EditCategory = ({ title }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState(0);
    const [catCode, setCatCode] = useState("");
    const [cat, setCat] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get(`${URI}/category`);
            setCat(res.data);
        }
        getCat();
        const timerId = setTimeout(getCat, 200);
        return () => clearTimeout(timerId);
    }, []);
    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get(`${URI}/category/` + path,);
            setName(res.data.name);
            setParentId(res.data.parent_id);
            setCatCode(res.data.cat_code);
        }
        getCat();
        const timerId = setTimeout(getCat, 200);
        return () => clearTimeout(timerId);
    }, [path]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name,
            parent_id: parentId === 0 ? null : parentId,
            cat_code: catCode
        }
        try {
            const res = await axios.put(`${URI}/category/${path}`, data,{ headers: {"Authorization" : `Bearer ${user.token}`} });
            res.data && window.location.replace('/categories');
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
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="formInput">
                            </div>
                            <div className="formInput" >
                                <label htmlFor="">
                                    Tên danh mục
                                </label>
                                <InputUpdate data={name} setData={setName} />

                                {
                                    parentId && (
                                        <>
                                            <label htmlFor="">
                                                Danh mục gốc
                                            </label>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={parentId}
                                                label="Danh mục gốc"
                                                sx={{ minWidth: '100%', mt: 1, mb: 3 }}
                                                onChange={(e) => setParentId(e.target.value)}
                                            >
                                                {
                                                    cat && cat.map((item) => (
                                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </>
                                    )
                                }
                                <label htmlFor="">
                                    Mã kí hiệu
                                </label>
                                <InputUpdate data={catCode} setData={setCatCode} />
                            </div>
                            <button className="sendBtn">Cập nhật</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCategory;
