import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function Cart() {
    return (
        <Container className='my-5'>
            <Row className="justify-content-md-center text-center">
                <AiOutlineCheckCircle style={{fontSize: "10rem", color: '#5cb85c'}}/>
                <h3 style={{fontSize: "2.5rem"}} className="mb-5">ĐẶT HÀNG THÀNH CÔNG ! </h3>
                <div className="mb-4" style={{fontSize: "1.9rem"}}>Cảm ơn quý khách đã đặt hàng tại Fivemen Coffee</div>
                <div className="mb-4" style={{fontSize: "1.9rem"}}>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất có thể. Trong trường hợp cần gấp vui lòng gọi Hotline: 1900123123</div>
                <div className="mb-4" style={{fontSize: "1.9rem"}}>Chân thành cảm ơn !</div>
            </Row>
            <Row className="justify-content-md-center text-center">
            <Button onClick={ e => window.location.replace('/')} variant="primary" className="my-4" type="submit" style={{fontSize: "1.6rem", width: '20%', padding: '10px', backgroundColor: '#ff781f', border: 'none'}}>
                  Về trang chủ
            </Button>
            </Row>
        </Container>
    )
}
