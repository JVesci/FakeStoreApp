import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Form,
    Button,
    Alert,
    Spinner,
    Row,
    Col,
    Card,
} from 'react-bootstrap';

function EditProduct() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                const product = response.data;
                setTitle(product.title);
                setPrice(product.price);
                setDescription(product.description);
                setCategory(product.category);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);
        setSuccessMessage('');

        const updatedProduct = {
            title,
            price: parseFloat(price),
            description,
            category,
        };

        try {
            await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProduct);
            setSuccessMessage('✅ Product updated successfully!');
        } catch (err) {
            setError(err);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" />
                <p className="mt-3">Loading product...</p>
            </Container>
        );
    }

    return (
        <Container className="py-1">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-1 shadow-sm border-0">
                        <h2 className="mb-1 text-center">Edit Product</h2>

                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {error && <Alert variant="danger">❌ Error: {error.message}</Alert>}

                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-1">
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <div className="d-grid">
                                <Button type="submit" variant="primary" disabled={updating}>
                                    {updating ? (
                                        <>
                                            <Spinner animation="border" size="sm" /> Updating...
                                        </>
                                    ) : (
                                        'Update Product'
                                    )}
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProduct;
