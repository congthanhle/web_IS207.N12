import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { Context } from '../../context/Context';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { URI, IMG } from '../../api';
import styles from './singleProduct.module.scss';


export default function SingleProduct() {
    const [product, setProduct] = useState({});
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [quantity, setQuantity] = useState(1);
    const { user } = useContext(Context);
    useEffect(() => {
        const getProduct = async () => {
            const res = await axios.get(`${URI}/product/` + path);
            setProduct(res.data);
        }
        getProduct();
        const timerId = setTimeout(getProduct, 200);
        return () => clearTimeout(timerId);
    }, [path]);
    const handleDecrement = () => {
        setQuantity(quantity - (quantity > 1 ? 1 : 0))
    }

    const handleIncrement = () => {
        setQuantity(quantity + 1)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            user_id: user.user.id,
            product_id: product.id,
            quantity: quantity,
        };

        try {
            const res = await axios.post(`${URI}/cart`, newProduct);
        } catch (e) { }
    }
    return (
        <Container className={styles.container}>
            <Row className='' style={{ marginBlock: 50 }}>
                <Col md="6"><img src={product.thumbnail && `${IMG}/${product.thumbnail}`} alt="" style={{ width: '100%' }} /></Col>
                <Col md="6" className='gx-5 ps-5' style={{ position: 'sticky' }}>
                    <div className='fs-1' style={{ fontWeight: 500 }}>{product.name}</div>
                    <hr />
                    <div style={{ color: 'red', fontWeight: 500 }} className='fs-3'>{product.unit_price && product.unit_price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</div>
                    <hr />
                    {
                        product.quantity !== 0 && (
                            <Row className='mt-5 ms-1 d-flex  justify-content-between '>
                                <Col md="3" className="d-flex align-items-center justify-content-around " style={{ border: '1px solid' }}>

                                    <Button color="link" className="px-2 py-2" variant="outline-white" style={{ border: 'none' }} onClick={handleDecrement}>
                                        <AiOutlineMinus className=" fs-4" />
                                    </Button>
                                    <Form.Control
                                        disabled={true}
                                        aria-describedby="basic-addon1"
                                        className='fs-4 text-center'
                                        type='number'
                                        value={quantity}

                                        style={{ border: 'none', backgroundColor: 'white', borderRadius: '0', borderColor: 'black' }}
                                    />

                                    <Button color="link" className="px-2 py-3" variant="outline-white" style={{ border: 'none' }} onClick={handleIncrement}>
                                        <AiOutlinePlus className=" fs-4" />
                                    </Button>
                                </Col>
                            </Row>

                        )
                    }

                    <Row className='mt-4 mb-5'>
                        <Col md='6'>
                            <Button className={styles.button} onClick={handleSubmit} disabled={product.quantity === 0 && true}>
                                {product.quantity == 0 ? "HẾT HÀNG" : "THÊM VÀO GIỎ"}
                            </Button>
                        </Col>

                    </Row>
                    <Row className='mb-5'>
                        <div className='fs-4 mb-1' style={{ fontWeight: 500 }}>MÔ TẢ</div>
                        <hr />
                        <div className='fs-4' dangerouslySetInnerHTML={{ __html: product.description }}></div>
                    </Row>
                </Col>

            </Row>

        </Container>
    )
}
