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
import styles from './profile.module.scss';


export default function Profile() {
  const { user, dispatch } = useContext(Context);
  const [info, setInfo] = useState({});
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const getProductCart = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/user/${user.user.id}`);
      setInfo(res.data);
    }
    getProductCart();
    const timerId = setTimeout(getProductCart, 100);
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/order/${user.user.id}`);
      setOrder(res.data);
    }
    getOrder();
    const timerId = setTimeout(getOrder, 100);
    return () => clearTimeout(timerId);
  }, []);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace('/');
  };
  return (
    <Container className="mb-5">

      <Row className="justify-content-md-center">
        <Col xs lg >
          <h1>Tài khoản của bạn</h1>
        </Col>

      </Row>
      <Row >
        <Col lg="5" className='gx-5'>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item className='fs-3 my-2'>
              Thông tin tài khoản              
              </ListGroup.Item>
              <ListGroup.Item className='fs-4 my-2'>
                <div
                  className="d-flex"
                >
                  <p className="mb-4" style={{ fontWeight: "500" }}>Họ tên:</p>
                  <p className="mb-2 ms-4">{info.fullname}</p>
                </div>

                <div
                  className="d-flex "
                >
                  <p className="mb-4" style={{ fontWeight: "500" }}>Email:</p>
                  <p className="ms-4">{info.email}</p>
                </div>
                <div
                  className="d-flex"
                >
                  <p className="mb-4" style={{ fontWeight: "500" }}>Địa chỉ:</p>
                  <p className="ms-4">{info.address}</p>
                </div>
                <div
                  className="d-flex"
                >
                  <p className="mb-2" style={{ fontWeight: "500" }}>Số điện thoại:</p>
                  <p className="ms-4">{info.phone_number}</p>
                </div>

              </ListGroup.Item>

            </ListGroup>
          </Card>
          <Button onClick={handleLogout} className='mt-3 fs-4' variant='warning'>Đăng xuất</Button>
        </Col>
        <Col >
          <Table striped bordered hover className='fs-4 ' style={{ height: 100, overflow: 'auto' }}>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Ngày đặt</th>
                <th>Tình trạng</th>
              </tr>
            </thead>
            <tbody>
              {
                order && order.map((item, index) => {
                  console.log(item.orderItems);
                  return (

                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{moment(item.created_at).format('DD-MM-YYYY HH:MM')}</td>
                      <td>{item.status}</td>
                    </tr>
                  )
                }
                )
              }
            </tbody>
          </Table>

        </Col>
      </Row>
    </Container>
  )
}
