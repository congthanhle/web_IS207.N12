import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import PageCategory from '../../components/pageCategory/PageCategory';
import styles from './promotion.module.scss';
import Pagination from 'react-js-pagination';
import {URI, IMG} from '../../api';
import TopProduct from '../../components/sidebar/TopProduct';


export default function Promotion() {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {

    const getProduct = async () => {
      const res = await axios.get(`${URI}/product/getComboList`);
      setProduct(res.data);
    }
    getProduct();
    const timerId = setTimeout(getProduct, 500);
    return () => clearTimeout(timerId);
  }, [pageNumber]);
  const { data, current_page, per_page, total } = product;
  const handleShow =(proId) => {
    window.location.replace(`/product/${proId}`);
} 
  return (
    <div className={styles.promotion}>
      <Container>
        <Row className="g-5">
          <Col xs lg="9" >
            <h1>Chương trình khuyến mãi</h1>
            {

              data && data.map((item, idx) => (

                <Row key={item.id}>
                  <Card className={styles.card}>
                    <Card.Title className={styles.cardTitle} onClick={()=>handleShow(item.id)}>{`${idx+1}. ${item.name}`}</Card.Title>
                    <Card.Body className={styles.cardBody}>
                      <Card.Text>
                        Chỉ còn: <b>{item.unit_price - item.discount_price} VND</b>
                      </Card.Text>
                      <Card.Text>
                        <b>Tiết kiệm: {item.discount_price} VND</b>
                      </Card.Text>
                    </Card.Body>
                    <Card.Img className={styles.card} variant="top" src={`${IMG}/${item.thumbnail}`} />
                  </Card>

                </Row>

              ))
            }
            <Row >
                      {
                      total && (
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
                      )
                    }
                    </Row>
          </Col>
          <Col xs lg="3">
            <PageCategory />
            <TopProduct/>
          </Col>
        </Row>

      </Container>
    </div>
  )
}




