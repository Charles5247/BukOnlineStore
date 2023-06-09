import React, { useState, useEffect } from "react";
import { Button, Container } from "@mui/material";
import { commerce } from "../../../lib/commerce";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await commerce.cart.retrieve();
        setCart(cartData);
      } catch (error) {
        // Handle error
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = () => {
    navigate("/customer/checkout");
  };

  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return (
    <Container maxWidth="md">
      {cart.line_items.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price.formatted_with_symbol}</p>
        </div>
      ))}
      <Button variant="contained" color="secondary" onClick={handleCheckout}>
        Checkout
      </Button>
    </Container>
  );
};

export default Cart;
