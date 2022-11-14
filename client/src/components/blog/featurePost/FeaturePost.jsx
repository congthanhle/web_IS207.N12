import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import styles from './featurePost.module.scss';

export default function FeaturePost() {
    return (
        <Card className={styles.card}>
            <Card.Title className={styles.cardTitle}>BÀI VIẾT MỚI NHẤT</Card.Title>
            <ListGroup className={styles.listGroup} as="ol" numbered>
                <ListGroup.Item className={styles.listGroupItem} as="li">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item className={styles.listGroupItem} as="li">Morbi leo risus</ListGroup.Item>
                <ListGroup.Item className={styles.listGroupItem} as="li">Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item className={styles.listGroupItem} as="li">Vestibulum at eros</ListGroup.Item>
            </ListGroup>
        </Card>

    )
}
