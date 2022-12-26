import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './sidebarProduct.module.scss';
import {URI} from '../../api';
import { BiArrowBack } from 'react-icons/bi';

export default function Sidebar() {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState("");
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get(`${URI}/category/` + path);
            setName(res.data.name)
            setCategory(res.data.children);
        }
        getCategory();
        const timerId = setTimeout(getCategory, 200);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <div className={styles.sidebar}>
            <ListGroup>
                <ListGroup.Item className='fs-3' style={{ height: 50, fontWeight: 500 }}>{name}</ListGroup.Item>
                {
                    category && 
                    category.map((p, index) => (
                        <ListGroup.Item key={index} style={{ height: 50 }}><Link to={`/collections/${p.id}`} className={`link fs-3 ${styles.text}`} >{p.name}</Link></ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    )
}
