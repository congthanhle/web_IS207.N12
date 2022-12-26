import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './sidebarProduct.module.scss';
import Accordion from 'react-bootstrap/Accordion';
import { URI } from '../../api';

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
            <ListGroup.Item className='fs-3' style={{ height: 50, fontWeight: 500, textAlign: 'center'}}>DANH MỤC SẢN PHẨM</ListGroup.Item>
            </ListGroup>
            <Accordion >
                {
                    category &&
                    category.map((p, index) => (
                        p.parent_id == null &&
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header ><span style={{ fontSize: 18 }}>{p.name}</span></Accordion.Header>
                            <Accordion.Body>
                                <ListGroup>

                                    {
                                        category &&
                                        category.map((c, idx) => (
                                            c.parent_id !== null && c.parent_id === p.id && <ListGroup.Item key={idx} style={{ height: 50, fontSize: 16,border: 'none' }}><Link to={`/collections/${c.id}`} className={`link ${styles.text}`} >{c.name}</Link></ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                }

            </Accordion>

        </div>
    )
}
