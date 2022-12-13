import React from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/SidebarProduct';
import TopProduct from '../../components/sidebar/TopProduct';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './collections.module.scss';
import { useState, useEffect, memo } from 'react';
import Products from '../../components/products/Products';
import Pagination from 'react-js-pagination';
import { URI } from '../../api';

function Collections() {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {

    const getProduct = async () => {
      const res = await axios.get(`${URI}/product/list?page=${pageNumber}`);
      setProduct(res.data);
    }
    getProduct();
    const timerId = setTimeout(getProduct, 500);
    return () => clearTimeout(timerId);
  }, [pageNumber]);
  const { data, current_page, per_page, total } = product;
  return (
    <div className={styles.collections}>
      <Container>
        <Row className="g-5">
          <Col xs lg="3">
            <Sidebar />
            <TopProduct />

          </Col>
          <Col xs lg="9">
            <Row md={1} xs={1}>
              <Col>
                <Row>
                  <Col>
                    <h2>Tất cả sản phẩm</h2>
                  </Col>

                </Row>
              </Col>
              <Col className={styles.listProduct}>
                <Row xs={1} md={4} className="g-4">
                  <Products products={data} />
                </Row>
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
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default memo(Collections);