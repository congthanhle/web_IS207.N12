import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo_white from '../../assets/images/logo_white.png';
import { FaFacebookF, FaHome, FaPhone, FaGoogle, FaTwitter } from 'react-icons/fa';
import { GrMail } from "@react-icons/all-files/gr/GrMail";
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer  className={styles.footer}>

      <section className=''>
        <Container className='text-center text-md-start mt-5'>
          <Row className='mt-4'>
            <Col md="3" lg="4" xl="3" className='mx-auto mb-4'>
            <img src={logo_white} className={styles.logo} alt="" />
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.catName} ${styles.brandName}`}>
                Five Men
              </h6>
             
            </Col>

            <Col md="2" lg="2" xl="3" className='mx-auto mb-4'>
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.catName}`}>Về chúng tôi</h6>
              <p>
                <a href='/about' className='text-reset'>
                  Giới thiệu
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Liên hệ
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Chính sách giao hàng
                </a>
              </p>
              <p>
                <a href='/blog' className='text-reset'>
                  Blog Cafe
                </a>
              </p>
            </Col>

            <Col md="3" lg="2" xl="3" >
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.catName}`} >Sản phẩm & dịch vụ</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Sản phẩm
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Dịch vụ
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Khuyến mãi
                </a>
              </p>

            </Col>

            <Col md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className={`text-uppercase fw-bold mb-4 ${styles.catName}`}>Liên hệ</h6>
              <p>
                <FaHome className="me-3"/>
                Bảo Lộc, Lâm Đồng
              </p>
              <p>
                <GrMail className="me-3"/>
                fiveme@gmail.coffee
              </p>
              <p>
                <FaPhone className="me-3"/>
                + 01 234 567 88
              </p>

              <div>
                <a href='' className='me-4 text-reset'>
                <FaFacebookF/>
                
                </a>
                <a href='' className='me-4 text-reset'>
                  <FaTwitter/>
                </a>
                <a href='' className='me-4 text-reset'>
                  <FaGoogle/>
                </a>

              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Five Men Coffee
        </a>
      </div>
    </footer>
  );
}

