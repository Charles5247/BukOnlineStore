import { useState, useEffect } from "react";
import { Button, Container, TextField } from "@mui/material";
import { commerce } from "../../lib/commerce";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [checkoutToken, setCheckoutToken] = useState(null);

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

  const handleGenerateToken = async () => {
    try {
      const token = await commerce.checkout.generateToken(cart.id, {
        type: "cart",
      });
      setCheckoutToken(token);
      // Redirect customer to the checkout page with the generated token
      // You can use React Router or any other method for navigation
    } catch (error) {
      // Handle error or show error notification
    }
  };

  const handleCaptureOrder = async (orderData) => {
    try {
      const order = await commerce.checkout.capture(
        checkoutToken.id,
        orderData
      );
      console.log("order", order);
      // Handle success or show order confirmation
    } catch (error) {
      // Handle error or show error notification
    }
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
      {!checkoutToken ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateToken}>
          Proceed to Checkout
        </Button>
      ) : (
        <form onSubmit={handleCaptureOrder}>
          {/* Render the checkout form fields (name, email, address, etc.) */}
          <TextField label="Name" fullWidth margin="normal" />
          <TextField label="Email" fullWidth margin="normal" />
          {/* Add more form fields as needed */}
          <Button type="submit" variant="contained" color="primary">
            Place Order
          </Button>
        </form>
      )}
    </Container>
  );
};

export default Checkout;
