import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { useContext, useRef, useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Context } from '../../context/Context';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { MdOutlineCancel} from 'react-icons/md';

import { BiEdit } from 'react-icons/bi';
import { URI, IMG } from '../../api';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import styles from './profile.module.scss';


export default function Profile() {
  const { user, dispatch } = useContext(Context);
  const [order, setOrder] = useState([]);
  const [show, setShow] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const [update, setUpdate] = useState(false);
  const [validated, setValidated] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [id, setId] = useState(0);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    const getProductCart = async () => {
      const res = await axios.get(`${URI}/user/${user.user.id}`, { headers: { "Authorization": `Bearer ${user.token}` } });
      setFullname(res.data.fullname);
      setEmail(res.data.email);
      setPhoneNumber(res.data.phone_number);
      setAddress(res.data.address);
    }
    getProductCart();
    const timerId = setTimeout(getProductCart, 100);
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`${URI}/order/user/${user.user.id}`, { headers: { "Authorization": `Bearer ${user.token}` } });
      setOrder(res.data.sort((a, b) => b.id - a.id));
    }
    getOrder();
    const timerId = setTimeout(getOrder, 100);
    return () => clearTimeout(timerId);
  }, []);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace('/');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Bạn có muốn cập nhật thông tin này?',
      showCancelButton: true,
      confirmButtonText: 'Cập nhật',
      closeButtonAriaLabel: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        const form = e.currentTarget;
        if(password && password === passwordConfirmation){
          try {
            const res = axios.put(`${URI}/user/${user.user.id}`, {
              password
            },{ headers: {"Authorization" : `Bearer ${user.token}`} });
          } catch (err) {
          }
        }
        if (form.checkValidity() === true) {
          e.preventDefault();
          try {
            const res = axios.put(`${URI}/user/${user.user.id}`, {
              fullname,
              phone_number: phoneNumber,
              address
            },{ headers: {"Authorization" : `Bearer ${user.token}`} });
            res.config.data && Swal.fire({
              title: 'Chỉnh sửa thành công',
              timer: 1500,
              icon: 'success',
              showConfirmButton: false
          },) && window.location.replace('/');
          } catch (err) {
    
          }
         
        }
        setValidated(true);
      } 
    })
   
  };
  const handleCancel = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Bạn có muốn hủy hóa đơn này?',
      showCancelButton: true,
      confirmButtonText: 'Hủy hóa đơn',
      closeButtonAriaLabel: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const res = axios.get(`${URI}/cancelOrder/${id}`,{ headers: {"Authorization" : `Bearer ${user.token}`} });
          res && Swal.fire('Hủy thành công!', '', 'success') && window.location.replace('/profile')
        } catch (err) {
        }    
      } 
    })
     
    }
  return (
    <Container className="mb-5">

      <Row className="justify-content-md-center">
        <Col xs lg >
          <h1>Tài khoản của bạn</h1>
        </Col>

      </Row>
      {
        update ? (

          <Row className="justify-content-md-center">
            <Col xs lg="5">
              <Form onSubmit={handleSubmit} noValidate validated={validated} className={styles.form}>
                <Form.Group className="mb-5" >
                  <Form.Control type="text" value={fullname} required onChange={(e) => setFullname(e.target.value)} />
                  <Form.Control.Feedback type="invalid" className=" fs-5">
                    Vui lòng điền họ tên
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" >
                  <Form.Control type="text" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} />
                  <Form.Control.Feedback type="invalid" className=" fs-5">
                    Vui lòng điền số điện thoại
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" >
                  <Form.Control type="text" value={address} required onChange={(e) => setAddress(e.target.value)} />
                  <Form.Control.Feedback type="invalid" className=" fs-5">
                    Vui lòng điền địa chỉ
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-5" controlId="formBasicPassword">
                  <Form.Control type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                  
                </Form.Group>
                <Form.Group className="mb-5" >
                  <Form.Control type="password" placeholder="Xác nhận mật khẩu"  onChange={(e) => setPasswordConfirmation(e.target.value)} />
                  
                </Form.Group>
                <Button variant="primary" type="submit">
                  Cập nhật
                </Button>
                <Button variant="primary" onClick={e => setUpdate(false)}>
                  Quay lại
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          <Row >
            <Col lg="4" className='gx-5'>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item className='fs-3 my-2'>
                    Thông tin tài khoản <BiEdit className='fs-2 ms-5' style={{ cursor: 'pointer' }} onClick={e => setUpdate(true)} />
                  </ListGroup.Item>
                  <ListGroup.Item className='fs-4 my-2'>
                    <div
                      className="d-flex"
                    >
                      <p className="mb-4" style={{ fontWeight: "500" }}>Họ tên:</p>
                      <p className="mb-2 ms-4">{fullname}</p>
                    </div>

                    <div
                      className="d-flex "
                    >
                      <p className="mb-4" style={{ fontWeight: "500" }}>Email:</p>
                      <p className="ms-4">{email}</p>
                    </div>
                    <Row
                      className='mb-4'
                    >
                      <Col  md="2" style={{ fontWeight: "500" }}>Địa chỉ:</Col>
                      <Col>{address}</Col>
                    </Row>
                    <div
                      className="d-flex"
                    >
                      <p className="mb-2" style={{ fontWeight: "500" }}>Số điện thoại:</p>
                      <p className="ms-4">{phoneNumber}</p>
                    </div>

                  </ListGroup.Item>

                </ListGroup>
              </Card>
              <Button onClick={handleLogout} className='mt-3 fs-4' style={{ backgroundColor: '#ff781f', border: 'none' }}>Đăng xuất</Button>
            </Col>

            <Col >
              {show ? (
                <>
                <div className='d-flex align-items-center justify-content-between fs-2 mb-4'>
                <span className='d-flex align-items-center ' onClick={e => setShow(false)} style={{ cursor: 'pointer' }}>
                    <IoMdArrowRoundBack className='me-4 ' />
                    <h3>Tất cả đơn hàng</h3>
                   
                  </span>
                  {
                     status === 'Chờ xác nhận' && <span className='d-flex align-items-center' style={{color: 'red', cursor: 'pointer'}} onClick={handleCancel}>
                     <MdOutlineCancel className='me-2'/>
                     <h3>Hủy đơn</h3>
                     </span>
                  }
                  
                </div>
                 

                  <Table  className='fs-4 ' style={{maxHeight: 40, borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>Tên sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orderItem && orderItem.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td><img src={`${IMG}/${item.product.thumbnail}`} alt="" width={90} /></td>
                              <td>{item.product.name}</td>
                              <td>{item.unit_price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                              <td>{item.quantity}</td>
                            </tr>
                          )
                        }
                        )
                      }
                    </tbody>
                  </Table>
                </>
              )
                :
                <Table striped bordered hover className='fs-4 ' style={{ overflow: 'auto' }}>
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Tổng tiền</th>
                      <th>Ngày đặt</th>
                      <th>Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      order && order.map((item, index) => {
                        return (
                          <tr key={index} style={{cursor: 'pointer'}} onClick={e => { setOrderItem(item.order_items); setShow(true); setStatus(item.status); setId(item.id)}}>
                            <td>{item.id}</td>
                            <td>{item.total_money.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                            <td>{moment(item.created_at).format('DD-MM-YYYY HH:MM')}</td>
                            <td>{item.status}</td>
                          </tr>
                        )
                      }
                      )
                    }
                  </tbody>
                </Table>

              }
            </Col>
          </Row>

        )

      }

    </Container>
  )
}
