/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams, Link } from "react-router-dom";
import "/src/css/customStyles.css";

function Category({ handleAddToCart }) {
    const { category } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/products/category/${category}`)
            .then((response) => {
                console.log(response.data.products);
                setData(response.data.products);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [category]);

    return (
        <Container>
            <Row className="d-flex align-items-stretch">
                {data.map((item) => (
                    <Col md={3} className="mb-4" key={item.id}>
                        <Card className="h-100" style={{ width: "18rem" }}>
                            <Carousel
                                // data-bs-theme="dark"
                                autoPlay={true}
                                interval={5000}
                                controls={false}
                                indicators={false}
                            >
                                {item.images.map((i, index) => (
                                    <Carousel.Item key={index}>
                                        <img
                                            className="d-block w-100 img-fluid"
                                            src={i}
                                            alt="Product slide"
                                            style={{ height: "200px", objectFit: "contain" }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <Card.Body>
                                <Card.Title>Product: {item.title}</Card.Title>
                                <Card.Text>
                                    Desc: {item.description.substring(0, 100)}...
                                </Card.Text>
                            </Card.Body>
                            <div className="d-flex justify-content-evenly my-2">
                                <Link to={`/item/${item.id}`}>
                                    <Button variant="primary">Details</Button>
                                </Link>
                                <Button
                                    onClick={() => handleAddToCart(item)}
                                    variant="primary"
                                >
                                    Add To Cart
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Category;
