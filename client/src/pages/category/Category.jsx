import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import Products from '../../components/products/Products';
import SidebarChildren from '../../components/sidebar/SidebarChildren';
import Pagination from 'react-js-pagination';
import styles from './category.module.scss';
import ListGroup from 'react-bootstrap/ListGroup';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {URI} from '../../api';

function Category() {
    const [product, setProduct] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [cat, setCat] = useState({});
    useEffect(() => {

        const getCat = async () => {
            const res = await axios.get(`${URI}/category/${path}`);
            setCat(res.data);
        }
        getCat();
        const timerId = setTimeout(getCat, 500);
        return () => clearTimeout(timerId);
    }, [path]);
    useEffect(() => {

        const getProduct = async () => {
            const res = await axios.get(`${URI}/product/searchCat/` + path + `list?page=${pageNumber}`);
            setProduct(res.data);
        }
        getProduct();
        const timerId = setTimeout(getProduct, 500);
        return () => clearTimeout(timerId);
    }, [pageNumber, path]);
    const { data, current_page, per_page, total } = product;
    return (

        <Container className={styles.category}>
            <Row className="g-5">
                <Col xs lg="3">
                    {
                        !cat.parent_id ? <SidebarChildren /> :
                            <ListGroup>
                                <ListGroup.Item className='fs-3' style={{ height: 50, fontWeight: 500 }}>
                                    <Link to={`/collections/${cat.parent_id}`} className={`link fs-3`} style={{ color: 'black' }}><IoMdArrowRoundBack className='mx-4' />{cat.parent.name}</Link>
                                </ListGroup.Item>
                            </ListGroup>
                    }

                </Col>
                <Col xs lg="9">
                    <Row className=' mb-5'>
                        <Col>
                            <h2>{cat.name}</h2>
                            <h5>Có <span>{total || 0} sản phẩm</span> cho tìm kiếm</h5>
                        </Col>
                    </Row>
                    <Row xs={1} md={4} className="g-4 mt-4">
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
        </Container>

    )
}

export default Category;