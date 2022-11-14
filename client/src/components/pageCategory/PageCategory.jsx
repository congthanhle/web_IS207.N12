import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import styles from './pageCategory.module.scss';


export default function PageCategory() {
  return (
    <Card className={styles.card}>
      <Card.Title className={styles.cardTitle}>DANH MỤC TRANG</Card.Title>
      <ListGroup className={styles.listGroup}>
        <ListGroup.Item className={styles.listGroupItem}>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item className={styles.listGroupItem}>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item className={styles.listGroupItem}>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item className={styles.listGroupItem}>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>

  )
}
