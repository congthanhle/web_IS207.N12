import React from 'react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import {Context} from '../../context/Context';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import { FaEye } from 'react-icons/fa';
import styles from './productCard.module.scss';
import {URI} from '../../api';


export default function ProductCard({product}) {
    const [showBtn, setShowBtn] = useState(false);
    const [productCart, setProductCart] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        const getProductCart = async () => {
          const res = await axios.get(`http://127.0.0.1:8000/api/v1/cart/${user.user.id}`);
          setProductCart(res.data);
        }
        getProductCart();
        const timerId = setTimeout(getProductCart, 200);
        return () => clearTimeout(timerId);
      },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            user_id: user.user.id,
            product_id: product.id,
            quantity: 1,
        };
        
        try{
            const res = await axios.post(`${URI}/cart`, newProduct);
        }catch(e){}
    } 
    const handleShow =(proId) => {
        window.location.replace(`/product/${proId}`);
    } 
    return (
        <>
            <Card border='0' className={styles.cardProduct} onMouseEnter={() => { setShowBtn(true) }} onMouseLeave={() => setShowBtn(false)}>
                <div className={styles.productImg} >
                    <Card.Img src={product.thumbnail} position='top' alt={product.name} />
                    {
                        showBtn &&
                        <ButtonGroup className={styles.buttonGroup}>
                            <Button className={styles.addBtn} onClick={handleSubmit}>THÊM VÀO GIỎ</Button>
                            <Button className={styles.eyeBtn} onClick={()=>handleShow(product.id)}><FaEye /></Button>
                        </ButtonGroup>
                    }

                </div>
                <Card.Body>
                    <Card.Title className={styles.productName}>{product.name}</Card.Title>
                    <Card.Text className={styles.productPrice}>
                        <span className={styles.primeCost}>{(product.unit_price - product.discount_price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</span>
                        {
                            product.discount_price === 0 ||
                            <span className={styles.discountCost}>{product.unit_price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</span>
                            
                        }  
                    </Card.Text>
                </Card.Body>
            </Card>
        </>

    )
}
