import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router';
import Products from '../../components/products/Products';
import Pagination from 'react-js-pagination';
import styles from './search.module.scss';
function Collections() {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  useEffect(() => {

    const getProduct = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/productSearch/?name=${path}&page=${pageNumber}`);
      setProduct(res.data);

    }
    getProduct();
    const timerId = setTimeout(getProduct, 500);
    return () => clearTimeout(timerId);
  }, [pageNumber]);
  const { data, current_page, per_page, total } = product;
  console.log(total)
  return (

    <Container className={styles.search}>
      <Row className='mt-5 mb-5'>
        <Col>
          <h2>Tìm kiếm</h2>
          <h5>Có <span>{0 || total} sản phẩm</span> cho tìm kiếm</h5>
        </Col>
      </Row>
      <Row xs={1} md={5} className="g-4 mt-4">
        <Products products={data} />
      </Row>
      <Row >
        <Col className={styles.pagination}>
          <Pagination totalItemsCount={10 || total} activePage={current_page} itemsCountPerPage={per_page}
            onChange={(pageNumber) => setPageNumber(pageNumber)}
            itemClass='page-item'
            linkClass='page-link'

          />

        </Col>
      </Row>


    </Container>

  )
}

export default memo(Collections);