import React from 'react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import { FaEye } from 'react-icons/fa';
import styles from './productCard.module.scss';
import { URI, IMG } from '../../api';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1100,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
  })
export default function ProductCard({ product }) {
    const [showBtn, setShowBtn] = useState(false);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(user){
            const newProduct = {
                user_id: user.user.id,
                product_id: product.id,
                quantity: 1,
            };
    
            try {
                const res = await axios.post(`${URI}/cart`, newProduct,{ headers: {"Authorization" : `Bearer ${user.token}`} });
                res && Toast.fire({
                    icon: 'success',
                    title: 'Thêm vào giỏ hàng thành công'
                  })
            } catch (e) { }
        }
        else{
              window.location.replace('/login');
        }
        
    }
    const handleShow = (proId) => {
        window.location.replace(`/product/${proId}`);
    }
    return (
        <>
            <Card border='0' className={styles.cardProduct} onMouseEnter={() => { setShowBtn(true) }} onMouseLeave={() => setShowBtn(false)}>
                <div className={styles.productImg} >
                    <Card.Img src={`${IMG}/${product.thumbnail}`} position='top' alt={product.name} />
                    {
                        showBtn &&
                        <ButtonGroup className={styles.buttonGroup}>
                            <Button className={styles.addBtn} onClick={handleSubmit} disabled={product.quantity === 0 && true}>
                                {
                                    product.quantity === 0 ? "HẾT HÀNG" : "THÊM VÀO GIỎ"
                                }
                            </Button>
                            <Button className={styles.eyeBtn} onClick={() => handleShow(product.id)}><FaEye /></Button>
                        </ButtonGroup>
                    }
                </div>
                <Card.Body>
                    <Card.Title className={styles.productName} onClick={() => handleShow(product.id)}>{product.name}</Card.Title>
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
