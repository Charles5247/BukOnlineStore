import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { REACT_APP_CHEC_PUBLIC_KEY, commerce } from "../../lib/commerce";


const createProduct = async (data) => {
  const url = "https://api.chec.io/v1/products";
  const token = REACT_APP_CHEC_PUBLIC_KEY; // Replace with your actual token

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const product = await response.json();
    console.log("Product created:", product);
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const AddProductForm = ({ productId = "" }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [merchant, setMerchant] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataURL = reader.result;
        setImage(imageDataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = {
        name,
        price: parseFloat(price),
        description,
        // Set other product details as needed
        media: {
          source: image,
        },
      };

      let createdProduct;
      if (productId) {
        // Updating existing product
        createdProduct = await createProduct(productData);
      } else {
        // Creating new product
        createdProduct = await createProduct(productData);
      }

      console.log(createdProduct);

      // Create variant and associate it with the merchant
      await commerce.variants.create(createdProduct.id, {
        merchant: merchant,
      });

       // Reset the form fields
       setName("");
       setPrice("");
       setDescription("");
       setMerchant("");
       setImage(null);
     } catch (error) {
       // Handle errors and show error notification
     }
   };

  return (
    <div>
      <h2>Add Product</h2>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit}>
          {/* Product form fields */}
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Image"
            //value={File}
            //onChange={(e) => setImage(e.target.value)}
            type="file"
            onChange={handleImageUpload}
            fullWidth
            required
            margin="normal"
            defaultValue={image && <img src={image} alt="Uploaded" />}
          />
          <TextField
            label="Merchant"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            {productId ? "Update Product" : "Create Product"}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AddProductForm;
