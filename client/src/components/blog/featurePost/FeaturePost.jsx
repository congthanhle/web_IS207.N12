import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import styles from './featurePost.module.scss';
import { URI } from '../../../api';

export default function FeaturePost() {
    const [post, setPost] = useState([]);
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get(`${URI}/post`);
            setPost(res.data.slice(0, 6));
        }
        getPost();
        const timerId = setTimeout(getPost, 200);
        return () => clearTimeout(timerId);
    }, []);
    return (
        <Card className={styles.card}>
            <Card.Title className={styles.cardTitle}>BÀI VIẾT MỚI NHẤT</Card.Title>
            <ListGroup className={styles.listGroup} as="ol" numbered>
                {
                    post && post.map((item, idx) => (
                        <ListGroup.Item className={styles.listGroupItem} as="li" key={idx} onClick={e => window.location.replace(`/blog/${item.id}`)}>{item.title}</ListGroup.Item>
                    ))
                }
            </ListGroup>
        </Card>

    )
}
