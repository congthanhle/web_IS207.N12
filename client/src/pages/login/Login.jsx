import axios from "axios";
import { useContext, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import {URI} from '../../api';
import styles from './login.module.scss';


export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch, isFetching} = useContext(Context);
  const [validated, setValidated] = useState(false);
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();
      dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${URI}/login`, {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data.status === 201 && window.location.replace('/')
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setNote("Tên đăng nhập hoặc mật khẩu không đúng");
    }
    }
  
    setValidated(true);
   
  };

  return (
      <Container>

      <Row className="justify-content-md-center">
        <Col xs lg="5">
        <Form onSubmit={handleSubmit} noValidate validated={validated} className={styles.form}>
        <h3>ĐĂNG NHẬP TÀI KHOẢN</h3>
        <Form.Group className="mb-5" >
         <Form.Control type="text" placeholder="Email" ref={userRef} required/>
         <Form.Control.Feedback type="invalid" className=" fs-5 mt-3">
            Vui lòng điền địa chỉ email
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-5" >
          <Form.Control type="password" placeholder="Mật khẩu" ref={passwordRef} required className="mb-2"/>
          <Form.Control.Feedback type="invalid" className=" fs-5">
            Vui lòng điền mật khẩu
          </Form.Control.Feedback>
          <Form.Text className="fs-5 mt-3" style={{color: 'red' }}>{note}</Form.Text>
         </Form.Group>
         <Button variant="primary" type="submit">
           ĐĂNG NHẬP
         </Button>
         </Form>
        </Col>
      </Row>
      <Row className={styles.footer}>
        <Col >
        <div className="d-flex justify-content-center links">
          Khách hàng mới?
          <Link to="/register" className="ms-2">Đăng ký</Link>
        </div>
        <div className="d-flex justify-content-center">
        Quên mật khẩu?
          <a href="/getPassword" className="ms-2">Khôi phục mật khẩu</a>
        </div>
        </Col>
      </Row>
    </Container>

  );
}