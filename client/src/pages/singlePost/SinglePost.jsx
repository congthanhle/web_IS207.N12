import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PageCategory from '../../components/pageCategory/PageCategory';
import BlogCard from '../../components/blog/blogCard/BlogCard';
import FeaturePost from '../../components/blog/featurePost/FeaturePost';
import styles from './singlePost.module.scss';
import { URI, IMG } from '../../api';
import moment from 'moment';
import { useLocation } from 'react-router';


export default function SinglePost() {
  const [post, setPost] = useState({});
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  useEffect(() => {
    const getPost= async () => {
        const res = await axios.get(`${URI}/post/` + path);
        setPost(res.data);
    }
    getPost();
    const timerId = setTimeout(getPost, 200);
    return () => clearTimeout(timerId);
}, []);
  return (
    <div>
        <Container className={styles.singlePost}>
        <Row className="g-5 my-5">       
        <Col xs lg="9">
        <img className={styles.postImg} src={`${IMG}/${post.thumbnail}`} alt="" />
        <h1 className={styles.title}>{post.title}</h1>
        <div className='fs-3 my-5' dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <Col className='d-flex justify-content-between'>
          <h4 className={styles.infoMore}>Ngày viết: {moment(post.created_at).format('DD/MM/YYYY')}</h4>
        </Col>
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
