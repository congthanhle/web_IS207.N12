import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { URI } from '../../api';
import Input from '../../components/inputField/Input';
import MenuItem from '@mui/material/MenuItem';
import Select  from '@mui/material/Select';
import { Context } from '../../context/Context';


const New = ({ inputs, title }) => {
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState(null);
    const [catCode, setCatCode] = useState("");
    const [cat, setCat] = useState([]);
    const { user } = useContext(Context);


    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get(`${URI}/category`);
            setCat(res.data.filter(item => item.parent_id === null));
        }
        getCat();
        const timerId = setTimeout(getCat, 200);
        return () => clearTimeout(timerId);
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = {
            name,
            parent_id: parentId,
            cat_code: catCode,
        };

        try {
            const res = await axios.post(`${URI}/category`, dataForm,{ headers: {"Authorization" : `Bearer ${user.token}`} });
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
                                <Input data={name} setData={setName} />
                                <label htmlFor="">
                                    Danh mục gốc
                                </label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={parentId}
                                    label="Danh mục gốc"
                                    sx={{ minWidth: '100%', mt: 1, mb: 3 }}
                                    onChange = {(e) => setParentId(e.target.value)}
                                >
                                    {
                                        cat.map((item) => (
                                            <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>

                                        ))
                                    }                                
                                </Select>
                                <label htmlFor="">
                                    Mã kí hiệu
                                </label>
                                <Input data={catCode} setData={setCatCode} />
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
