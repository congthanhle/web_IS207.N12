import React from 'react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { GiReceiveMoney } from 'react-icons/gi';
import Table from 'react-bootstrap/Table';
import { MdPayment } from 'react-icons/md';
import styles from './checkout.module.scss';
import { URI, IMG } from '../../api';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export default function Cart() {
    const { user } = useContext(Context);
    const [productCart, setProductCart] = useState([]);
    const [note, setNote] = useState('');
    const [payment, setPayment] = useState('Trực tiếp');
    const [loading, setLoading] = useState(false);
    var totalPrice = 0;
    useEffect(() => {
        const getProductCart = async () => {
            const res = await axios.get(`${URI}/cart/${user.user.id}`, { headers: { "Authorization": `Bearer ${user.token}` } });
            setProductCart(res.data);
        }
        getProductCart();
        const timerId = setTimeout(getProductCart, 100);
        return () => clearTimeout(timerId);
    }, []);
    const handleInput = (e) => {
        setNote(e.target.value);
    }
    const changeValue = (e) => {
        setPayment(e.target.value);
    }
    const handlePay = async (e) => {
        e.preventDefault();
        const order = {
            user_id: user.user.id,
            note: note,
            payment: payment,
        }
        setLoading(true);
        const res = await axios.post(`${URI}/order`, order, { headers: { "Authorization": `Bearer ${user.token}` } });
        res && window.location.replace('/success')

    }
    return (
        <Container className="py-5 h-100 fs-4">

            <Row className="justify-content-center align-items-center h-100">
                {
                    loading ? <div className='text-center fs-3' style={{marginBlock:'10vw'}}><Spinner  animation="grow" className='me-3'/> Đang tiến hành thanh toán<h3 className='mt-4'>Vui lòng đợi trong một vài giây !</h3></div> :
                        <Col md="10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 tag="h3" className="fw-normal mb-0 text-black">
                                    Danh sách sản phẩm
                                </h3>

                            </div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productCart && productCart.map((p, index) => {
                                            totalPrice += (p.product.unit_price - p.product.discount_price) * p.quantity;
                                            return (
                                                <tr key={index}>
                                                    <td><img src={`${IMG}/${p.product.thumbnail}`} alt="" width={80} /></td>
                                                    <td>{p.product.name}</td>
                                                    <td>{p.quantity}</td>
                                                    <td> {(p.product.unit_price - p.product.discount_price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>

                            </Table>

                            <Card
                                className="shadow-2-strong mb-5 mb-lg-0"
                                style={{ borderRadius: "16px" }}
                            >
                                <Card.Body className="p-4">
                                    <Row>
                                        <Col md="6" lg="4" xl="3" className="mb-4 mb-md-0 ">
                                            <form onChange={changeValue}>
                                                <div className="d-flex flex-row pb-3">
                                                    <div className="rounded  w-100 p-3 px-4">
                                                        <p className="d-flex align-items-center mb-0" style={{ fontWeight: "500" }}>
                                                            Phương thức thanh toán
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row pb-3 mb-3">
                                                    <div className="d-flex align-items-center pe-2">
                                                        <Form.Check
                                                            type="radio"
                                                            id="offline"
                                                            name="payment"
                                                            value="Trực tiếp"
                                                            required
                                                            
                                                        />
                                                    </div>
                                                    <div className="rounded border w-100 p-3">
                                                        <p className="d-flex align-items-center mb-0">
                                                            <GiReceiveMoney className=' fs-1' />

                                                            Thanh toán trực tiếp (COD)
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row pb-3">
                                                    <div className="d-flex align-items-center pe-2">
                                                        <Form.Check
                                                            type="radio"
                                                            id={`default`}
                                                            name="payment"
                                                            value="Trực tuyến"
                                                        />
                                                    </div>
                                                    <div className="rounded border w-100 p-3">
                                                        <p className="d-flex align-items-center mb-0">
                                                            <MdPayment className=' fs-1' />
                                                            Thanh toán Online
                                                        </p>
                                                    </div>
                                                </div>
                                            </form>
                                        </Col>
                                        <Col md="6" lg="4" xl="6 gx-5">
                                            <Row>
                                                <div className="rounded w-100 p-3">
                                                    <p className="d-flex align-items-center mb-0" style={{ fontWeight: "500" }}>
                                                        Ghi chú đơn hàng
                                                    </p>
                                                </div>
                                            </Row>
                                            <Row>

                                                <Form.Control as="textarea" aria-label="With textarea" className='mt-3 fs-4' style={{ height: 150, resize: "none" }} onChange={handleInput} value={note} />
                                            </Row>
                                        </Col>
                                        <Col lg="4" xl="3">
                                            <div
                                                className="d-flex justify-content-between"
                                                style={{ fontWeight: "500" }}
                                            >
                                                <p className="mb-2">Tạm tính</p>
                                                <p className="mb-2">{totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</p>
                                            </div>

                                            <div
                                                className="d-flex justify-content-between"
                                                style={{ fontWeight: "500" }}
                                            >
                                                <p className="mb-0">Phí vận chuyển</p>
                                                <p className="mb-0">0đ</p>
                                            </div>

                                            <hr className="my-4" />

                                            <div
                                                className="d-flex justify-content-between mb-4"
                                                style={{ fontWeight: "500" }}
                                            >
                                                <p className="mb-0">Tổng tiền</p>
                                                <p className="mb-0">{totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</p>
                                            </div>

                                            <Button styles={{ width: 100 }} size="lg" onClick={handlePay} className={styles.button}>
                                                Đặt hàng
                                            </Button>
                                            <Link to="/cart" className='link fs-4 d-flex justify-content-center'>
                                                <span style={{ color: 'black', fontWeight: 500}} ><AiOutlineShoppingCart className='me-3 fs-1' />Giỏ hàng</span>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                }
            </Row>
        </Container>
    )
}
