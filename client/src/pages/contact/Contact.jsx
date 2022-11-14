import React from 'react';
import Container from 'react-bootstrap/Container';
import Slide from '../../components/slide/Slide';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './contact.module.scss';
export default function Contact() {
    return (
        <div className={styles.contact}>
            <Slide />
            <Container className={styles.info}>
                <Row xs={1} md={4} className="justify-content-md-between g-5">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col>
                            <Card className={styles.infoCard}>
                                <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/icon_contact_box_1.png?v=258" />
                                <Card.Body>
                                    <Card.Title className={styles.cardTitle}>Email</Card.Title>
                                    <Card.Text className={styles.cardText}>
                                        Some quick example text to build on the card title and make up the
                                        bulk of the card's content.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}

                </Row>
                <Row md={2} className={`${styles.form} justify-content-md-center`}>
                    <Col>

                        <Form>
                            <Form.Group className="mb-4">
                                <Form.Text className={styles.formTitle}>Gửi thắc mắc cho chúng tôi</Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-5">
                                <Form.Control type="text" placeholder="Tên của bạn" className={styles.formControl} />
                            </Form.Group>
                            <Row className='g-5'>
                                <Col>
                                    <Form.Group className="mb-5" >
                                        <Form.Control type="email" placeholder="Email" className={styles.formControl} />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-5" >
                                        <Form.Control type="phone" placeholder="Số điện thoại" className={styles.formControl} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-5" >
                                <Form.Control type="text" placeholder="Nội dung" as="textarea" rows={8} className={styles.formTextArea} />
                            </Form.Group>

                            <Button type="submit"> Gửi cho chúng tôi</Button>


                        </Form>

                    </Col>

                </Row>

            </Container>
        </div>
    )
}
