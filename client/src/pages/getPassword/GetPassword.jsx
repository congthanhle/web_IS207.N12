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
import styles from './getPassword.module.scss';


export default function Login() {
  const email = useRef();
  const [note, setNote] = useState("");
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();
      try {
        const res = await axios.post(`${URI}/test`, {
          email: email.current.value,
        });
        setNote(res.data.message);
        res.data.status === 200 && window.location.replace('/login')
      } catch (err) {
      }
    }
  
    setValidated(true);
  };

  return (
      <Container>
      <Row className="justify-content-md-center">
        <Col xs lg="5">
        <Form onSubmit={handleSubmit} noValidate validated={validated} className={styles.form}>
        <h3>KHÔI PHỤC MẬT KHẨU</h3>
        <Form.Group className="mb-5" >
         <Form.Control type="text" placeholder="Email" ref={email} onChange={e => setNote("")} required className="mb-2"/>
         <Form.Text className=" fs-5" style={{color: 'red'}}>{note}</Form.Text>
         <Form.Control.Feedback type="invalid" className=" fs-5 mt-3">
            Vui lòng điền địa chỉ email
          </Form.Control.Feedback>
        </Form.Group>
         <Button variant="primary" type="submit">
           XÁC NHẬN
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
          <a href="/login">Đăng nhập</a>
        </div>
        </Col>
      </Row>
    </Container>

  );
}