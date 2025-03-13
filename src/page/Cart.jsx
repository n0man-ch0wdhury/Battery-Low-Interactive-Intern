/* eslint-disable react/prop-types */
import { Button, Container, Table } from "react-bootstrap";

const Cart = ({ cart, removeFromCart, setCart }) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const increaseQuantity = (item) => {
    const newCart = cart.map((product) => {
      if (product.id === item.id) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(newCart);
  };

  const decreaseQuantity = (item) => {
    const newCart = cart.map((product) => {
      if (product.id === item.id) {
        return {
          ...product,
          quantity: product.quantity > 1 ? product.quantity - 1 : 1,
        }; // This prevents the quantity from going below 1
      }
      return product;
    });
    setCart(newCart);
  };

  return (
    <Container fluid="sm">
      <h1 className="my-4">Shopping Cart</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.length > 0 ? (
            cart.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => decreaseQuantity(item)}
                  >
                    -
                  </Button>{" "}
                  {item.quantity}{" "}
                  <Button
                    variant="outline-secondary"
                    onClick={() => increaseQuantity(item)}
                  >
                    +
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => removeFromCart(item)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Your cart is empty</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>

        <Button variant="success">Continue Shopping</Button>
      </div>
    </Container>
  );
};

export default Cart;
