import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './sidebarProduct.module.scss';
import {URI} from '../../api';

export default function Sidebar() {
    const [category, setCategory] = useState([]);
    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get(`${URI}/category`);
            setCategory(res.data);
        }
        getCategory();
        const timerId = setTimeout(getCategory, 200);
        return () => clearTimeout(timerId);
    }, []);
    return (
        <div className={styles.sidebar}>
            <ListGroup>
                <ListGroup.Item className='fs-3' style={{ height: 50, fontWeight: 500, textAlign: 'center', textTransform: 'upperCase' }}>Danh mục sản phẩm</ListGroup.Item>
                {
                    category &&
                    category.map((p, index) => (
                        p.parent_id == null && <ListGroup.Item key={index} style={{ height: 50 }}><Link to={`/collections/${p.id}`} className={`link fs-3 ${styles.text}`} >{p.name}</Link></ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
    )
}
