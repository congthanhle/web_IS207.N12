import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slide from '../../components/slide/Slide';
import BlogCard from '../../components/blog/blogCard/BlogCard';
import coffeeIcon from '../../assets/images/coffeeIcon.png';
import coffee_branch from '../../assets/images/coffee_branch.png';
import coffee_bean from '../../assets/images/coffee_bean.png';
import styles from './home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <Slide />
      <div className={styles.homeContainer}>
        <div border='white' className={`${styles.productAndService} ${styles.homeSession}`}>
          <div className={styles.titleContainer}><span>Sản phẩm & dịch vụ</span></div>
          <Row xs={3} md={6} className="justify-content-between align-items-center g-5">
              <Col>
                <Card border='white' className={styles.card} >
                  <div className={styles.cardProduct} style={{backgroundColor: '#daeec4'}}>
                    <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256" />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>Cà Phê & Series Tươi</Card.Title>
                  </Card.Body>
                </Card>
                
              </Col>
              <Col>
                <Card border='white' className={styles.card}>
                  <div className={styles.cardProduct} style={{backgroundColor: '#FFEFD8'}}>
                    <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256" />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>Máy Pha Cà Phê</Card.Title>
                  </Card.Body>
                </Card>
                
              </Col>
              <Col>
                <Card border='white' className={styles.card}>
                  <div className={styles.cardProduct} style={{backgroundColor: '#FFE7C3'}}>
                    <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256" />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>Dụng Cụ Pha Chế</Card.Title>
                  </Card.Body>
                </Card>
                
              </Col>
              <Col>
                <Card border='white' className={styles.card}>
                  <div className={styles.cardProduct} style={{backgroundColor: '#F8EDE9'}}>
                    <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256" />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>Đào tạo cà phê</Card.Title>
                  </Card.Body>
                </Card>
                
              </Col>
              <Col>
                <Card border='white' className={styles.card}>
                  <div className={styles.cardProduct} style={{backgroundColor: '#E3FFE3'}}>
                    <Card.Img className={styles.cardImage} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256" />
                  </div>
                  <Card.Body>
                    <Card.Title className={styles.cardTitle}>Dịch Vụ Rang</Card.Title>
                  </Card.Body>
                </Card>
                
              </Col>
             
          
          </Row>
          
        </div>
        <div className={`${styles.sale} ${styles.homeSession}`}>

          <div className={styles.titleContainer}>
            <img className={styles.icon} src={coffeeIcon} alt="logo" />
            <span>Chương trình khuyến mãi</span>
          </div>


          <Row xs={1} md={4} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key = {idx}>
                <Card className={`${styles.cardCur} ${styles.card}`}>
                  <Card.Img variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256" />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        <div border='white' className={`${styles.featureProducts} ${styles.homeSession}`}>

          <div className={styles.titleContainer}>
            <img />
            <span>Sản phẩm nổi bật</span>
          </div>
          <Row xs={1} md={5} className="g-4">

          </Row>

        </div>
        <div border='white' className={`${styles.introProduct} ${styles.homeSession}`}>
          <img className={styles.sub_img_1} src={coffee_branch} alt="" />    
          <img className={styles.sub_img_2} src={coffee_bean} alt="" />    
          <div className={styles.titleContainer}>
            <img />
            Tại sao bạn nên chọn Five Men Coffee
          </div>
          <Row xs={1} md={3} className="g-4">
           
              <Col >
                <Card className={`${styles.card} text-center`}>
                  <Card.Img className={styles.cardImg} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_feature_item_1.png?v=261" />
                  <Card.Body>
                    <Card.Title className={`${styles.cardTitle}`}>Nguyên liệu tốt nhất</Card.Title>
                    <Card.Text className={styles.cardContent}>
                    Những hạt cà phê được chọn lọc từ vùng nguyên liệu Buôn Ma Thuột và Lâm Đồng.
                    </Card.Text>                   
                  </Card.Body>
                </Card>
              </Col>
              <Col >
                <Card className={`${styles.card} text-center`}>
                  <Card.Img className={styles.cardImg} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_feature_item_2.png?v=261" />
                  <Card.Body>
                    <Card.Title className={`${styles.cardTitle}`}>Công nghệ hiện đại</Card.Title>
                    <Card.Text className={styles.cardContent}>
                    Quy mô nhà máy hơn 42.000m2 và công nghệ hiện đại kết hợp với bí quyết truyền thống.
                    </Card.Text>                   
                  </Card.Body>
                </Card>
              </Col>
              <Col >
                <Card className={`${styles.card} text-center`}>
                  <Card.Img className={styles.cardImg} variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_feature_item_3.png?v=261" />
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
        <div className={`${styles.blog} ${styles.homeSession}`}>

          <div className={styles.titleContainer}>
            <span>Coffee Blog</span>
          </div>
          <Row xs={1} md={4} className="g-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col key = {idx}>
                <BlogCard btn={false}/>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>

  )
}
