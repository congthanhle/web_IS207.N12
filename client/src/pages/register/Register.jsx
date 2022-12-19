import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import styles from './register.module.scss';
import { URI } from '../../api';

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validated, setValidated] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceCode, setProvinceCode] = useState(1);
  const [districtCode, setDistrictCode] = useState(1);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");


  useEffect(() => {

    const getProvinces = async () => {
      const res = await axios.get('https://provinces.open-api.vn/api/');
      setProvinces(res.data);
    }
    getProvinces();
    const timerId = setTimeout(getProvinces, 500);
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {
    try {
      const getProvince = async () => {
        
        const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        setDistricts(res.data.districts);
      }
      getProvince();
      const timerId = setTimeout(getProvince, 500);
      return () => clearTimeout(timerId);
    } catch (error) {
      
    }
   
  }, [provinceCode]);
  useEffect(() => {
    try {
      const getProvince = async () => {
        const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        setWards(res.data.wards);
      }
      getProvince();
      const timerId = setTimeout(getProvince, 500);
      return () => clearTimeout(timerId);
    } catch (error) {
      
    }
    
  }, [districtCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();
      try {
        const addr = address + ", " + ward + ', ' +  district + ', ' + province;
        const res = await axios.post(`${URI}/register`, {
          fullname,
          email,
          phone_number: phoneNumber,
          address: addr,
          password,
          password_confirmation: passwordConfirmation
        });
        res.config.data && window.location.replace('/');
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
            <h3>TẠO TÀI KHOẢN</h3>
            <Form.Group className="mb-5" >
              <Form.Control type="text" placeholder="Họ tên" required onChange={(e) => setFullname(e.target.value)} />
              <Form.Control.Feedback type="invalid" className=" fs-5">
                Vui lòng điền họ tên
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
              <Form.Control.Feedback type="invalid" className=" fs-5">
                Vui lòng điền email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" >
              <Form.Control type="text" placeholder="Số điện thoại" required onChange={(e) => setPhoneNumber(e.target.value)} />
              <Form.Control.Feedback type="invalid" className=" fs-5">
                Vui lòng điền số điện thoại
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
            <Form.Group className="mb-5" as={Col} >
              <Form.Select style={{ height: 45, fontSize: 16}} onChange={e=>{setProvinceCode(e.target.value);setProvince(e.target.selectedOptions[0].text)}}>
                <option>Tỉnh</option>
                {
                  provinces.map(province => (
                    <option value={province.code} key={province.code}>{province.name}</option>
                  ))
                }

              </Form.Select>
             
            </Form.Group>
            <Form.Group className="mb-5" as={Col}>
              <Form.Select style={{ height: 45, fontSize: 16}} onChange={e=>{setDistrictCode(e.target.value); setDistrict(e.target.selectedOptions[0].text)}} >
                <option>Quận/Huyện</option>
                {
                  districts && districts.map(item => ( <option value={item.code} key={item.code}>{item.name}</option>))
                }

              </Form.Select>             
            </Form.Group>
            </Row>
            <Form.Group className="mb-5" >
              <Form.Select style={{ height: 45, fontSize: 16}} onChange={e=>{ setWard(e.target.selectedOptions[0].text)}}>
                <option>Phường/Xã</option>
                {
                  wards && wards.map(item => ( <option value={item.code} key={item.code}>{item.name}</option>))
                }


              </Form.Select>
              <Form.Control.Feedback type="invalid" className=" fs-5">
                Vui lòng điền Phường/Xã
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" >
              <Form.Control type="text" placeholder="Số nhà" required onChange={(e) => setAddress(e.target.value)} />
              <Form.Control.Feedback type="invalid" className=" fs-5">
                Vui lòng điền số nhà
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Mật khẩu" required onChange={(e) => setPassword(e.target.value)} />
              <Form.Control.Feedback type="invalid" className=" fs-5">
                Vui lòng điền mật khẩu
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5" >
              <Form.Control type="password" placeholder="Xác nhận mật khẩu" required onChange={(e) => setPasswordConfirmation(e.target.value)} />
              <Form.Control.Feedback type="invalid" className=" fs-5">
                Vui lòng xác thực mật khẩu
              </Form.Control.Feedback>
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
