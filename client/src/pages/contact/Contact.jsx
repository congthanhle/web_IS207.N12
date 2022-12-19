import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Slide from '../../components/slide/Slide';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './contact.module.scss';
import axios from 'axios';
import { URI } from '../../api';
import Swal from 'sweetalert2';

export default function Contact() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData();
        dataForm.append('username', username);
        dataForm.append('email', email);
        dataForm.append('phone_number', phoneNumber);
        dataForm.append('content', content);
        try {
            const res = await axios.post(`${URI}/feedback`, dataForm);
            res.data && Swal.fire({
                title: 'Gửi thành công',
                timer: 1200,
                icon: 'success',
                showConfirmButton: false
            },) && window.location.replace('/') ;
        } catch (e) { }
    }
    return (
        <div className={styles.contact}>
            <Slide />
            <Container className={styles.info}>
                <Row xs={1} md={4} className="justify-content-md-between g-5">
                    <Col>
                        <Card className={styles.infoCard}>
                            <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/icon_contact_box_1.png?v=258" />
                            <Card.Body>
                                <Card.Title className={styles.cardTitle}>Địa chỉ</Card.Title>
                                <Card.Text className={styles.cardText}>
                                    TP.Bảo Lộc, tỉnh Lâm Đồng
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.infoCard}>
                            <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/icon_contact_box_2.png?v=261" />
                            <Card.Body>
                                <Card.Title className={styles.cardTitle}>Email</Card.Title>
                                <Card.Text className={styles.cardText}>
                                    fivemen.coffee@gmail.com
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.infoCard}>
                            <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/icon_contact_box_3.png?v=261" />
                            <Card.Body>
                                <Card.Title className={styles.cardTitle}>Điện thoại</Card.Title>
                                <Card.Text className={styles.cardText}>
                                    039.2333.687
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={styles.infoCard}>
                            <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/icon_contact_box_1.png?v=258" />
                            <Card.Body>
                                <Card.Title className={styles.cardTitle}>Thời gian làm việc</Card.Title>
                                <Card.Text className={styles.cardText}>
                                    Thứ 2-Thứ 7: 8h -17h
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row md={2} className={`${styles.form} justify-content-md-center`}>
                    <Col>

                        <Form onSubmit={handleSubmit}> 
                            <Form.Group className="mb-4">
                                <Form.Text className={styles.formTitle}>Gửi thắc mắc cho chúng tôi</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-5">
                                <Form.Control required type="text" placeholder="Tên của bạn" className={styles.formControl} onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Row className='g-5'>
                                <Col>
                                    <Form.Group className="mb-5" >
                                        <Form.Control required type="email" placeholder="Email" className={styles.formControl} onChange={e => setEmail(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-5" >
                                        <Form.Control required type="phone" placeholder="Số điện thoại" className={styles.formControl} onChange={e => setPhoneNumber(e.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-5" >
                                <Form.Control type="text" required placeholder="Nội dung" as="textarea" rows={8} className={styles.formTextArea} onChange={e => setContent(e.target.value)}/>
                            </Form.Group>
                            <Button type="submit">Gửi</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
