import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './sidebarProduct.module.scss';
import { URI } from '../../api';

export default function Sidebar() {
    const [product, setProduct] = useState([]);
    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get(`${URI}/getTopSales`);
            setProduct(res.data.slice(0, 6));
        }
        getProduct();
        const timerId = setTimeout(getProduct, 200);
        return () => clearTimeout(timerId);
    }, []);
    return (
        <div className={styles.sidebar}>
            <ListGroup>
                <ListGroup.Item className='fs-3' style={{ height: 50, fontWeight: 500, textAlign: 'center', textTransform: 'upperCase'}}>Sản phẩm bán chạy</ListGroup.Item>
                <ListGroup.Item>
                    {
                        product &&
                        <ol>
                            {
                                product.map((p, index) => (
                                    <li key={index} style={{marginBlock: 12, fontSize: 16}}><Link to={`/product/${p.id}`} className={`link ${styles.text}`} >{p.name}</Link></li>
                                ))
                            }
                        </ol>
                    }
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}
