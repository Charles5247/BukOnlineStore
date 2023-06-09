import { useState, useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await commerce.products.list();
        setProducts(data);
      } catch (error) {
        // Handle error
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await commerce.cart.add(productId, 1);
      // Handle success or show notification
    } catch (error) {
      // Handle error or show error notification
    }
  };

  return (
    <Container maxWidth="md">
      {products.map((product) => (
        <Card
          key={product.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "1rem",
          }}>
          <CardMedia
            component="img"
            src={product.image.url}
            alt={product.name}
            sx={{ height: 200, width: "auto", objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              Price: {product.price.formatted_with_symbol}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default ProductList;
