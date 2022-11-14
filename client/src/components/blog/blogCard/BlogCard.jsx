import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './blogCard.module.scss';

export default function BlogCard(props) {
    const { btn } = props;
    return (
        <Card className={styles.card}>
            <Card.Img variant="top" src="https://theme.hstatic.net/200000309869/1000702189/14/img_home_list_icon_1.png?v=256" />
            <Card.Body>
                <Card.Title className={styles.cardTitle}>WORKSHOP: "Rang sao cho đúng?"</Card.Title>
                <Card.Text className={styles.cardBlogDesc}>
                    With supporting text below as a natural lead-in to additional content.With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                {
                    !btn ?
                        <Card.Link href="#" className={styles.cardBlogBtn_1}>Xem thêm</Card.Link> :
                        <Button size="lg" className={styles.cardBlogBtn_2}>
                            Đọc thêm
                        </Button>
                }

            </Card.Body>
        </Card>
    )
}
