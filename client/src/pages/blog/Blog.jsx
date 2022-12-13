import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PageCategory from '../../components/pageCategory/PageCategory';
import BlogCard from '../../components/blog/blogCard/BlogCard';
import FeaturePost from '../../components/blog/featurePost/FeaturePost';
import styles from './blog.module.scss';
import Pagination from 'react-js-pagination';
import { URI } from '../../api';
import axios from 'axios';


export default function Blog() {
  const [post, setPost] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${URI}/post/list?page=${pageNumber}`);
      setPost(res.data);
    }
    getPost();
    const timerId = setTimeout(getPost, 500);
    return () => clearTimeout(timerId);
  }, [pageNumber]);
  const { data, current_page, per_page, total } = post;
  return (
    <div >
      <Container className={styles.blog}>
        <Row className="g-5">

          <Col xs lg="9">
            <h1>Blog </h1>
            <Row xs={1} md={3} className="g-5">
              {
                data && data.map((item, idx) => (
                  <Col key={item.id}>
                    <BlogCard btn={true} title={item.title} content={item.content} thumbnail={item.thumbnail} id={item.id} />
                  </Col>
                ))
              }
            </Row>
          </Col>
          <Col xs lg="3">
            <FeaturePost />
            <PageCategory />
          </Col>
        </Row>
        <Row >
          {total && (
            <Col className={styles.pagination}>
              <Pagination totalItemsCount={total} activePage={current_page} itemsCountPerPage={per_page}
                onChange={(pageNumber) => setPageNumber(pageNumber)}
                pageRangeDisplayed={4}

                linkClass={styles.paginationLinkItem}
                itemClass={styles.paginationItem}
                activeLinkClass={styles.paginationLinkActive}
                activeClass={styles.paginationActive}
                disabledClass={styles.paginationDisabled}
              />
            </Col>
          )}
        </Row>
      </Container>
    </div>
  )
}
