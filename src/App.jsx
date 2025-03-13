// App.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Cart from "./page/Cart";
import Category from "/src/components/Category";
import Single from "/src/components/Single";
import Home from "/src/page/Home";
import Product from "./components/Product";

function NotFound() {
  return <div>Page Not Found</div>;
}

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // If the product exists, increase its quantity
      const newCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(newCart);
    } else {
      // If the product doesn't exist, add it to the cart with quantity 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    console.log("Cart updated:", cart);
  };

  const removeFromCart = (item) => {
    const newCart = cart.filter((product) => product !== item);
    setCart(newCart);
  };

  return (
    <BrowserRouter>
      <Navigation cart={cart} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/item/:id"
          element={<Single handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/category/:category"
          element={<Category handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/all-products"
          element={<Product handleAddToCart={handleAddToCart} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
