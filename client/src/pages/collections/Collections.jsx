import React from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/SidebarProduct';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './collections.module.scss';
import { useState, useEffect, memo } from 'react';
import { useLocation } from 'react-router';
import Products from '../../components/products/Products';
import Pagination from 'react-js-pagination';
function Collections() {
  const [product, setProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const location = useLocation();
  const path = location.pathname.split("/")[2] === 'all' ? `list?page=${pageNumber}` : `searchCat/${location.pathname.split("/")[2]}`;
  useEffect(() => {
    
    const getProduct = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/v1/product/` + path);
      setProduct(res.data);
      
    }
    getProduct();
    const timerId = setTimeout(getProduct, 500);
    return () => clearTimeout(timerId);
  }, [pageNumber, path]);
  const { data, current_page, per_page, total} = product;
  return (
    <div className={styles.collections}>

      <Container>

        <Row className="g-5">
          <Col xs lg="3">
            <Sidebar />
          </Col>
          <Col xs lg="9">
            <Row md={1} xs={1}>
              <Col>
                <Row>
                  <Col>
                    <h2>Tất cả sản phẩm</h2>
                  </Col>
                  <Col>
                    <Dropdown className={styles.dropdown} >
                      <Dropdown.Toggle id="dropdown-basic">
                        Mới nhất
                      </Dropdown.Toggle>

                      <Dropdown.Menu className={styles.dropdown_menu}>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>

              </Col>
              <Col className={styles.listProduct}>
                <Row xs={1} md={4} className="g-4">
                  <Products products={location.pathname.split("/")[2] === 'all' ? data : product} />
                </Row>
                {
                  location.pathname.split("/")[2] === 'all' &&(
                    <Row >
                  <Col className={styles.pagination}>
                  <Pagination totalItemsCount={10 || total} activePage={current_page} itemsCountPerPage={per_page}
                    onChange={(pageNumber) => setPageNumber(pageNumber)}
                    itemClass= 'page-item'
                    linkClass='page-link'
                    activeLinkClassName={styles.paginationActive}
                    pageLinkClassName={styles.paginationItem}
   
                  />

                  </Col>
                </Row>
                  )
                }
                
              </Col>

            </Row>

          </Col>

        </Row>

      </Container>
    </div>
  )
}

export default memo(Collections);