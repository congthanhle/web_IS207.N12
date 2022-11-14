import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import styles from './sidebarProduct.module.scss';

export default function Sidebar() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/v1/category`);
            setCategory(res.data);
        }
        getCategory();
        const timerId = setTimeout(getCategory, 200);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <div className={styles.sidebar}>
            <Accordion>
                {
                    category &&
                    category.map((p,index) => (
                        <Accordion.Item  className={styles.accordionItem} key={index}>
                            {p.parent_id == null && <Accordion.Header><Link to={`/collections/${p.id}`} className={`link fs-4`} style={{ color: 'black' }}>{p.name}</Link></Accordion.Header>}
                            <Accordion.Body>
                                {p.parent_id != null && <Link to={`/collections/${p.id}`} className={`link fs-4`} style={{ color: 'black' }}>{p.name}</Link>}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
        </div>
    )
}
