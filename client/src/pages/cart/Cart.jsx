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
import { BsTrash } from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { BsCartPlusFill } from 'react-icons/bs';
import { MdPayment } from 'react-icons/md';
import styles from './cart.module.scss';
import { URI, IMG } from '../../api';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';



export default function Cart() {
  const { user } = useContext(Context);
  const [productCart, setProductCart] = useState([]);
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


  return (
    <Container className="py-5 h-100 fs-4">

      <Row className="justify-content-center align-items-center h-100">
        {
          loading ? <Spinner animation="border" /> :
            <Col md="10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 tag="h3" className="fw-normal mb-0 text-black">
                  GIỎ HÀNG
                </h3>

              </div>
              {
                productCart && productCart.map(p => {
                  totalPrice += (p.product.unit_price - p.product.discount_price) * p.quantity;
                  return (
                    <Card className="rounded-3 mb-4" key={p.id}>
                      <Card.Body className="p-4 fs-4">
                        <Row className="justify-content-between align-items-center">
                          <Col md="2" lg="2" xl="2">
                            <Card.Img
                              src={`${IMG}/${p.product.thumbnail}`}
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
              {
                productCart.length === 0 ?
                  (
                    <Card className="d-flex align-items-center justify-content-center" style={{ marginBottom: '14vh' }}>
                      <Card.Title className='fs-3 my-5'>Bạn không có sản phẩm nào trong giỏ hàng</Card.Title>
                      <Card.Body className='mb-5'>
                        <Link to="/collections/all">
                          <BsCartPlusFill style={{ fontSize: '50px', color: 'black' }} />
                        </Link>
                      </Card.Body>
                    </Card>
                  ) : (
                    <div className='float-end'>
                      <div >
                        <p className="mb-0 me-5 d-flex align-items-center fs-2">
                          <span className="small text-muted me-2">Tổng tiền:</span>
                          <span className="lead fw-normal fs-3">{totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</span>
                        </p>
                      </div>
               
                     
                      <Button size="lg" className={styles.button} onClick={e => window.location.replace('/checkout')}>
                          Thanh toán
                        </Button>
                        <Link to="/collections/all" className='link fs-4'>
                          <span style={{color: 'black' }} ><BiArrowBack className='me-3'/>Tiếp tục mua hàng</span>
                        </Link>
                      

                     
                    </div>

                  )
              }
            </Col>
        }
      </Row>
    </Container>
  )
}
