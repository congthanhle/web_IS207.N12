import React from 'react';
import Slide from '../../components/slide/Slide';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import styles from './introduction.module.scss';

export default function Introduction() {
  return (
    <div className={styles.introduction}>
      <Slide />
      <Container>
        <div className={styles.information_1}>
          <h1>Five Men Coffee - Nơi Hội Tụ Các Giải Pháp Cà Phê</h1>
          <h2>Lan Tỏa Đam Mê Cà Phê Việt</h2>
          <Row xs={1} md={3} className="g-5">
           
              <Col>
                <Card className={`${styles.card} text-center`}>
                  <Card.Img className={styles.cardImg} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/info_icon_1_about3.png?v=261" />
                  <Card.Body>
                    <Card.Title className={`${styles.cardTitle}`}>Nguyên liệu tốt nhất</Card.Title>
                    <Card.Text className={styles.cardContent}>
                    Những hạt cà phê được chọn lọc từ vùng nguyên liệu Buôn Ma Thuột và Lâm Đồng.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className={`${styles.card} text-center`}>
                  <Card.Img className={styles.cardImg} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/info_icon_2_about3.png?v=261" />
                  <Card.Body>
                    <Card.Title className={`${styles.cardTitle}`}>Công nghệ hiện đại</Card.Title>
                    <Card.Text className={styles.cardContent}>
                    Quy mô nhà máy hơn 42.000m2 và công nghệ hiện đại kết hợp với bí quyết truyền thống.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className={`${styles.card} text-center`}>
                  <Card.Img className={styles.cardImg} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/info_icon_3_about3.png?v=261" />
                  <Card.Body>
                    <Card.Title className={`${styles.cardTitle}`}>Con người đam mê</Card.Title>
                    <Card.Text className={styles.cardContent}>
                    Sản phẩm được tạo ra từ tâm huyết của một tập thể và chứa đựng niềm đam mê cà phê.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
           
          </Row>
        </div>
        <ul className={styles.information_2}>
          <li className={styles.reverse}>
            <img src="https://theme.hstatic.net/200000309869/1000702189/14/members_1_about3_img.jpg?v=258" alt="" />
            <h1>Cung Cấp Cà Phê</h1>
          </li>
          <li >
            <img src="https://theme.hstatic.net/200000309869/1000702189/14/members_1_about3_img.jpg?v=258" alt="" />
            <h1>Máy Pha Cà Phê 1 Group - 2 Group - Tự Động</h1>
          </li>
          <li className={styles.reverse}>
            <img src="https://theme.hstatic.net/200000309869/1000702189/14/members_1_about3_img.jpg?v=258" alt="" />
            <h1>Cung Cấp Máy Xay Cà Phê Cao cấp</h1>
          </li>
          <li >
            <img src="https://theme.hstatic.net/200000309869/1000702189/14/members_1_about3_img.jpg?v=258" alt="" />
            <h1>Dụng Cụ Pha Chế - Barista Mart</h1>
          </li>
          <li className={styles.reverse}>
            <img src="https://theme.hstatic.net/200000309869/1000702189/14/members_1_about3_img.jpg?v=258" alt="" />
            <h1>Trải Nghiệm Rang Cà Phê</h1>
          </li>
          <li>
            <img src="https://theme.hstatic.net/200000309869/1000702189/14/members_1_about3_img.jpg?v=258" alt="" />
            <h1>Tư Vấn Gu Cà Phê Phù Hợp</h1>
          </li>
        </ul>
      </Container>
    </div>
  )
}
