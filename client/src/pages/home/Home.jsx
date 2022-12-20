import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Slide from '../../components/slide/Slide';
import BlogCard from '../../components/blog/blogCard/BlogCard';
import coffeeIcon from '../../assets/images/coffeeIcon.png';
import coffee_branch from '../../assets/images/coffee_branch.png';
import coffee_bean from '../../assets/images/coffee_bean.png';
import styles from './home.module.scss';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import ProductCard from '../../components/productCard/ProductCard';
import { URI, IMG } from '../../api';

const productAndService = [
  {
    name: 'Cà Phê & Series Tươi',
    img_link: 'https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256',
    color: '#daeec4'
  },
  {
    name: 'Máy Pha Cà Phê',
    img_link: 'https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_2.png?v=261',
    color: '#FFEFD8'
  },
  {
    name: 'Dụng Cụ Pha Chế',
    img_link: 'https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_3.png?v=261',
    color: '#FFE7C3'
  },
  {
    name: 'Đào tạo cà phê',
    img_link: 'https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_4.png?v=261',
    color: '#F8EDE9'
  },
  {
    name: 'Dịch Vụ Rang',
    img_link: 'https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_5.png?v=261',
    color: '#E3FFE3'
  }
]

export default function Home() {
  const [post, setPost] = useState([]);
  const [product, setProduct] = useState([]);
  const [combo, setCombo] = useState([]);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${URI}/post`);
      setPost(res.data.slice(0, 8));
    }
    getPost();
    const timerId = setTimeout(getPost, 500);
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`${URI}/product`);
      setProduct(res.data.slice(0, 10));
    }
    getProduct();
    const timerId = setTimeout(getProduct, 500);
    return () => clearTimeout(timerId);
  }, []);
  useEffect(() => {

    const getCombo = async () => {
      const res = await axios.get(`${URI}/product/getCombo`);
      setCombo(res.data.slice(0, 6));
    }
    getCombo();
    const timerId = setTimeout(getCombo, 500);
    return () => clearTimeout(timerId);
  }, []);
  const handleShowCombo = (proId) => {
    window.location.replace(`/product/${proId}`);
}
  return (
    <div className={styles.home}>
      <Slide />
      <div className={styles.homeContainer}>
        <Container border='white' className={`${styles.productAndService} ${styles.homeSession}`}>
          <div className={styles.titleContainer}><span>Sản phẩm & dịch vụ</span></div>
          <Row xs={3} md={6} className="justify-content-between align-items-center g-5">
            {
              productAndService.map((item, index) => (
                <Col key={index}>
                  <Card border='white' className={styles.card}>
                    <div className={styles.cardProduct} style={{ backgroundColor: `${item.color}` }}>
                      <Card.Img className={styles.cardImage} variant="top" src={item.img_link} />
                    </div>
                    <Card.Body>
                      <Card.Title className={styles.cardTitle}>{item.name}</Card.Title>
                    </Card.Body>
                  </Card>

                </Col>

              ))
            }

          </Row>

        </Container>
        <Container className={`${styles.sale} ${styles.homeSession}`}>

          <div className={styles.titleContainer}>
            <img className={styles.icon} src={coffeeIcon} alt="logo" />
            <span>Chương trình khuyến mãi</span>
          </div>
          <Row xs={1} md={3} className="g-5">
            {
              combo.map((item, idx) => (
                <Col key={item.id}>
                  <Card style={{border: 'none', cursor: 'pointer'}} onClick={() => handleShowCombo(item.id)}>  
                    <Card.Img variant="top" src={`${IMG}/${item.thumbnail}`} style={{height: 120}}/>
                    <Card.Body>
                      <Card.Title className='fs-4'>{item.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            }
          </Row>
        </Container>
        <Container border='white' className={`${styles.featureProducts} ${styles.homeSession}`}>

          <div className={styles.titleContainer}>

            <span>Sản phẩm nổi bật</span>
          </div>
          <Row xs={2} md={5} className="g-4">
            {
              product.map((item, idx) => (
                <Col key={item.id}>
                  <ProductCard product={item} />
                </Col>
              ))
            }
          </Row>

        </Container>
        <div border='white' className={`${styles.introProduct} ${styles.homeSession}`}>
          <img className={styles.sub_img_1} src={coffee_branch} alt="" />
          <img className={styles.sub_img_2} src={coffee_bean} alt="" />
          <div className={styles.titleContainer}>
            <img />
            Tại sao bạn nên chọn Five Men Coffee
          </div>
          <Row xs={3} md={3} className="g-4">

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
        <Container className={`${styles.blog} ${styles.homeSession}`}>

          <div className={styles.titleContainer}>
            <span onClick={e => { window.location.replace('/blog') }}>Coffee Blog</span>
          </div>
          <Row xs={1} md={4} className="g-4">
            {
              post.map((item, idx) => (
                <Col key={item.id}>
                  <BlogCard btn={false} title={item.title} content={item.content} thumbnail={item.thumbnail} id={item.id} />
                </Col>
              ))
            }
          </Row>
        </Container>
      </div>
    </div>

  )
}
