import React from 'react';
import axios from "axios";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import styles from './register.module.scss';
import {URI} from '../../api';

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URI}/register`, {
        fullname,
        email,
        phone_number: phoneNumber,
        address,
        password,
        password_confirmation: passwordConfirmation
      });
      res.config.data && window.location.replace('/');
    } catch (err) {

    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
        <Form onSubmit={handleSubmit} className={styles.form}>
        <h3>TẠO TÀI KHOẢN</h3>
        <Form.Group className="mb-5" >
          <Form.Control type="text" placeholder="Họ tên" onChange={(e) => setFullname(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-5" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-5" >
          <Form.Control type="text" placeholder="Số điện thoại" onChange={(e) => setPhoneNumber(e.target.value)} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-5" >
          <Form.Control type="text" placeholder="Địa chỉ" onChange={(e) => setAddress(e.target.value)} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-5" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Mật khẩu" required onChange={(e) => setPassword(e.target.value)} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-5" >
          <Form.Control type="password" placeholder="Xác nhận mật khẩu" required onChange={(e) => setPasswordConfirmation(e.target.value)} />
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Đăng ký
        </Button>
      </Form>
        </Col>
      </Row>
      
    </Container>
  )
}
