import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './blogCard.module.scss';
import {IMG} from '../../../api';

export default function BlogCard(props) {
    const { btn, title, content, thumbnail, id} = props;
    return (
        <Card className={styles.card}>
            <Card.Img variant="top" src={`${IMG}/${thumbnail}`} />
            <Card.Body>
                <Card.Title className={styles.cardTitle}>{title}</Card.Title>
                <div className={styles.cardBlogDesc} dangerouslySetInnerHTML={{ __html: content}}></div>
                {
                    !btn ?
                        <Card.Link href={`/blog/${id}`} className={styles.cardBlogBtn_1}>Xem thêm</Card.Link> :
                        <Button size="lg" className={styles.cardBlogBtn_2} onClick={e => window.location.replace(`/blog/${id}`)}>
                            Đọc thêm
                        </Button>
                }

            </Card.Body>
        </Card>
    )
}
