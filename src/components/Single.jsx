/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import './Product.css'
// import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";

function Single({ handleAddToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        console.log("test");
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: "22rem" }}>
        <Card.Img variant="top" src={product.images[0]} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
        <span className=" d-flex justify-content-center mb-1">
          <Button
            onClick={() => handleAddToCart(product)}
            className="btn-primary"
          >
            Add to Cart
          </Button>
        </span>
      </Card>
    </div>
    // <div>
    //     <h2>{product.title}</h2>
    //     <img src={product.images[0]} alt={product.title} style={{ maxWidth: '300px' }} />
    //     <p>Description: {product.description}</p>
    //     <p>Price: {product.price}</p>
    //     <p>Category: {product.category}</p>
    // </div>
    // <p>hello</p>
  );
}

export default Single;
