// VendorDashboard.js
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { commerce } from "../../lib/commerce";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchVendorProducts();
  }, []);

  const fetchVendorProducts = async () => {
    try {
      const { data: products } = await commerce.products.list({
        // Set filters to fetch products by vendor or any other criteria
      });
      setProducts(products);
    } catch (error) {
      // Handle any errors
    }
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ marginTop: "2rem" }}>
        My Products
      </Typography>
      {products.length === 0 ? (
        <Typography variant="body1">No products found</Typography>
      ) : (
        <>
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{ display: "flex", marginBottom: "1rem" }}>
              <CardMedia
                component="img"
                src={product.image.url}
                alt={product.name}
                sx={{ height: 150, width: "auto", objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {product.price.formatted_with_symbol}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};

export default VendorProducts;
