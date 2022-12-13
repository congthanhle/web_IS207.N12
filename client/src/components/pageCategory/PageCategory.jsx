import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import styles from './pageCategory.module.scss';


export default function PageCategory() {
  return (
    <Card className={styles.card}>
      <Card.Title className={`${styles.cardTitle} fs-3`} >DANH MỤC TRANG</Card.Title>
      <ListGroup className={styles.listGroup}>
        <ListGroup.Item className={styles.listGroupItem}> <Link className={`${styles.navLink} link`} to="/about">Giới thiệu</Link></ListGroup.Item> 
        <ListGroup.Item className={styles.listGroupItem}> <Link className={`${styles.navLink} link`} to="/contact">Liên hệ</Link></ListGroup.Item>
        <ListGroup.Item className={styles.listGroupItem}> <Link className={`${styles.navLink} link`} to="/about">Chính sách giao hàng</Link></ListGroup.Item>
        <ListGroup.Item className={styles.listGroupItem}> <Link className={`${styles.navLink} link`} to="/blog">Cafe Blog</Link></ListGroup.Item>
      </ListGroup>
    </Card>

  )
}
