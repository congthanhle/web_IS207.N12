import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PageCategory from '../../components/pageCategory/PageCategory';
import styles from './promotion.module.scss';

export default function Promotion() {
  return (
    <div className={styles.promotion}>

    <Container>
      <Row className="g-5">
        <Col xs lg="9">
          <h1>Chương Trình Ưu Đãi</h1>
          <Card className={styles.card}>
          <Card.Title className={styles.cardTitle}>1. Combo Quán Lớn (300-350 ly/ngày) - Máy Bezzera B2016 2 Groups và Máy Xay HC600 Version 2.0</Card.Title>
            <Card.Body className={styles.cardBody}>
              <Card.Text>
              Chỉ còn: <b>78,100,000 VND</b>
              </Card.Text>
              <Card.Text>
              <b>Tiết kiệm: 78,100,000 VND</b>
              </Card.Text>
              <Card.Text>
              Tặng thêm gói quà tặng & dịch vụ trị giá: <b>10.981.500 VND</b>
              </Card.Text>
            </Card.Body>
            <Card.Img className={styles.card} variant="top" src="https://file.hstatic.net/200000309869/file/quan_lon_1_8a1cb6b4c4964e1888c2f9a75eb824a0_1024x1024.png" />

          </Card>
          <Card className={styles.card}>
          <Card.Title className={styles.cardTitle}>1. Combo Quán Lớn (300-350 ly/ngày) - Máy Bezzera B2016 2 Groups và Máy Xay HC600 Version 2.0</Card.Title>
            <Card.Body className={styles.cardBody}>
              <Card.Text>
              Chỉ còn: <b>78,100,000 VND</b>
              </Card.Text>
              <Card.Text>
              <b>Tiết kiệm: 78,100,000 VND</b>
              </Card.Text>
              <Card.Text>
              Tặng thêm gói quà tặng & dịch vụ trị giá: <b>10.981.500 VND</b>
              </Card.Text>
            </Card.Body>
            <Card.Img className={styles.card} variant="top" src="https://file.hstatic.net/200000309869/file/quan_lon_1_8a1cb6b4c4964e1888c2f9a75eb824a0_1024x1024.png" />

          </Card>
          <Card className={styles.card}>
          <Card.Title className={styles.cardTitle}>1. Combo Quán Lớn (300-350 ly/ngày) - Máy Bezzera B2016 2 Groups và Máy Xay HC600 Version 2.0</Card.Title>
            <Card.Body className={styles.cardBody}>
              <Card.Text>
              Chỉ còn: <b>78,100,000 VND</b>
              </Card.Text>
              <Card.Text>
              <b>Tiết kiệm: 78,100,000 VND</b>
              </Card.Text>
              <Card.Text>
              Tặng thêm gói quà tặng & dịch vụ trị giá: <b>10.981.500 VND</b>
              </Card.Text>
            </Card.Body>
            <Card.Img className={styles.card} variant="top" src="https://file.hstatic.net/200000309869/file/quan_lon_1_8a1cb6b4c4964e1888c2f9a75eb824a0_1024x1024.png" />

          </Card>
        </Col>
        <Col xs lg="3">
          <PageCategory />
        </Col>
      </Row>
    </Container>
    </div>
  )
}


