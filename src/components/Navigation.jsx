// Navigation.jsx
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "/src/css/customStyles.css";

// eslint-disable-next-line react/prop-types
function Navigation({ cart }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category-list")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            E-Sell
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/all-products">All Products</Nav.Link>
            <NavDropdown title="All Categories" id="navbarScrollingDropdown">
              {data.map((category) => (
                <NavDropdown.Item key={category} className="dropdown-item-custom">
                  <Link
                    to={`/category/${category}`}
                    className="text-decoration-none shadow-md"
                    style={{ color: "navy" }}
                  >
                    <span>{category}</span>
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Link to="/cart">
            <div
              className="ml-8"
              style={{
                position: "relative",
                display: "inline-block",
                marginLeft: "16px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8a.5.5 0 0 1-.491.408H4.409a.5.5 0 0 1-.491-.408L2.01 3.59l-.027-.082L1.61 2H.5a.5.5 0 0 1-.5-.5zM3.01 4l1.191 6h9.602l1.2-6H3.009z" />
              </svg>

              <span
                style={{
                  position: "absolute",
                  right: 0,
                  top: -3,
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                {cart.length}
              </span>
            </div>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
