import ProductCard from "../productCard/ProductCard";
import Col from 'react-bootstrap/Col';

export default function Products({products}) {
  return (
    <>
      { 
        products &&       
        products.map((p,index) => (
            <Col key={index}><ProductCard  product={p}/></Col>      
        ))  
      }
      
    </>
  );
}