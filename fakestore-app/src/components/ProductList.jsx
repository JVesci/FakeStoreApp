import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading Products...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <h1 className="my-4">Product List</h1>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                style={{ objectFit: 'contain', height: '200px' }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <div className="d-flex flex-wrap gap-2 mt-3">
                  <Link to={`/products/${product.id}`}>
                    <Button variant="info">View</Button>
                  </Link>
                  <Link to={`/edit/${product.id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;

