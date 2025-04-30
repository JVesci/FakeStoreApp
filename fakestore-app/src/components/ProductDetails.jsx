import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Sorry, we couldn't load the product details. Please try again.");
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`https://fakestoreapi.com/products/${id}`)
      .then(() => {
        setShowConfirm(false);
        navigate('/'); // Redirect to product list or home page after deletion
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        setShowConfirm(false);
        setError("Failed to delete the product. Please try again.");
      });
  };

  if (loading) {
    return (
      <Container className="my-5" style={{ textAlign: 'center' }}>
        <Spinner animation="border" variant="primary" />
        <p>Loading product details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5" style={{ textAlign: 'center' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Img
          variant="top"
          src={product.image}
          style={{ objectFit: 'contain', height: '300px' }}
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
          <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
          <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
          <div className="d-flex gap-3 mt-4">
            <Button variant="success">Add to Cart</Button>
            <Button variant="danger" onClick={() => setShowConfirm(true)}>
              Delete Product
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetails;