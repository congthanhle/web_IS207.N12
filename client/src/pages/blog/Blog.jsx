import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PageCategory from '../../components/pageCategory/PageCategory';
import BlogCard from '../../components/blog/blogCard/BlogCard';
import FeaturePost from '../../components/blog/featurePost/FeaturePost';
import styles from './blog.module.scss';

export default function Blog() {
  return (
    <div >
      <Container className={styles.blog}>
        <Row className="g-5">
          
        <Col xs lg="9">
        <h1>Tin tức </h1>
        <Row xs={1} md={3} className="g-5">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Col key={idx}>
               <BlogCard btn={true}/>
              </Col>
            ))}
          </Row>
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
