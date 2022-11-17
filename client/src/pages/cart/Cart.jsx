import React from 'react';
import axios from 'axios';
import { useContext, useEffect, useState} from 'react';
import { Context } from '../../context/Context';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import styles from './cart.module.scss';
import {URI} from '../../api';


export default function Cart() {
  const { user } = useContext(Context);
  const [productCart, setProductCart] = useState([]);
  const [note, setNote] = useState('');
  const [payment, setPayment] = useState(' ');
  var totalPrice = 0;
  useEffect(() => {
    const getProductCart = async () => {
      const res = await axios.get(`${URI}/cart/${user.user.id}`);
      setProductCart(res.data);
    }
    getProductCart();
    const timerId = setTimeout(getProductCart, 100);
    return () => clearTimeout(timerId);
  }, []);

  const handleDecrement = (cart_id, quantity) => {

    setProductCart(productCart => productCart.map(item =>
      cart_id === item.id ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) } : item
    ))
    if (quantity > 1) {
      updateCartQuantity(cart_id, "dec")
    }


  }

  const handleIncrement = (cart_id) => {
    setProductCart(productCart => productCart.map(item =>
      cart_id === item.id ? { ...item, quantity: item.quantity + 1 } : item

    ))
    updateCartQuantity(cart_id, "inc");

  }
  function updateCartQuantity(cart_id, scope) {
    axios.put(`${URI}/cart/updateQuantity/${cart_id}/${scope}`);
  }

  const handleDelete = (e, cart_id) => {
    e.preventDefault();
    axios.delete(`${URI}/cart/${cart_id}`)

    setProductCart(productCart => productCart.filter(el => el.id !== cart_id))

  }


 

  const handleInput = (e) => {
    setNote(e.target.value);  
  }
  const changeValue = (e)=>{
    setPayment(e.target.value);
  }

  

  const handlePay = (e) => {
    e.preventDefault();
    const order = {
      user_id: user.user.id,
      note: note,
      payment: payment,
    }
    axios.post(`${URI}/order`, order);
  }
  return (
    <Container className="py-5 h-100 fs-4">
      <Row className="justify-content-center align-items-center h-100">
        <Col md="10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 tag="h3" className="fw-normal mb-0 text-black">
              SHOPPING CART
            </h3>

          </div>

          {
            productCart.map(p => {
              
              totalPrice += p.product.unit_price * p.quantity;
              return (
                <Card className="rounded-3 mb-4" key={p.id}>
                  <Card.Body className="p-4 fs-4">
                    <Row className="justify-content-between align-items-center">
                      <Col md="2" lg="2" xl="2">
                        <Card.Img
                          src={p.product.thumbnail}
                          alt="Cotton T-shirt" width="100" height="100" />

                      </Col>
                      <Col md="3" lg="3" xl="3">
                        <p className="lead fw-normal mb-2 fs-3">{p.product.name}</p>

                      </Col>
                      <Col md="3" lg="3" xl="2"
                        className="d-flex align-items-center justify-content-around pb-2" >
                        <Button color="link" className="px-2 py-2" variant="outline-dark" onClick={(e) => handleDecrement(p.id, p.quantity)}>
                          <AiOutlineMinus />
                        </Button>

                        <Form.Control
                          disabled={true}
                          aria-describedby="basic-addon1"
                          className="fs-4 p-1 text-center"
                          type='number'
                          min={1}
                          value={p.quantity}
                        />

                        <Button color="link" className="px-2 py-2" variant="outline-dark" onClick={(e) => handleIncrement(p.id)}>
                          <AiOutlinePlus />
                        </Button>
                      </Col>
                      <Col md="3" lg="2" xl="2" className="offset-lg-1">
                        <h4 className="mb-0">
                          {(p.product.unit_price * p.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ
                        </h4>
                      </Col>
                      <Col md="1" lg="1" xl="1" className="text-end fs-2" >
                        <a href="#!" className="text-danger">
                          <BsTrash onClick={(e) => handleDelete(e, p.id)} />
                        </a>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>)

            }


            )
          }
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

                    <Form.Control as="textarea" aria-label="With textarea" className='mt-3 fs-4' style={{ height: 116, resize: "none" }} onChange={handleInput} value={note}/>
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
                    Thanh toán
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>




        </Col>
      </Row>
    </Container>
  )
}
