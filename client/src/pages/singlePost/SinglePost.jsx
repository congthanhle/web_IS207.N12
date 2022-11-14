import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageCategory from '../../components/pageCategory/PageCategory';
import BlogCard from '../../components/blog/blogCard/BlogCard';
import FeaturePost from '../../components/blog/featurePost/FeaturePost';
import styles from './singlePost.module.scss';

export default function SinglePost() {
  return (
    <div>
        <Container className={styles.singlePost}>
        <Row className="g-5">       
        <Col xs lg="9">
        <img className={styles.postImg} src="https://file.hstatic.net/200000309869/article/web_a02729e59c584faabf8cf6a0db1031d0_1024x1024.png" alt="" />
        <h1 className={styles.title}>CHƯƠNG TRÌNH COMBO CÀ PHÊ & BÁNH</h1>
        <h6 className={styles.infoMore}>Người viết: Công Thành Lê</h6>
        </Col>
        <Col xs lg="3">
        <FeaturePost/>  
        <PageCategory />
        </Col>
        </Row>

      </Container>
      
    </div>
  )
}
