import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddBeans = () => {
  const [formValues, setFormValues] = useState({
    productID: '',
    name: '',
    productImage: '',
    productPrice: '',
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);

   const response = await fetch(`${process.env.REACT_APP_API_URL}/product/createproduct`,{
        method:"POST",
        body:JSON.stringify(formValues),
        headers:{
            "content-type":"application/json"
        }
    })
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        maxWidth: 500,
        mx: 'auto',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" color="primary" sx={{ mb: 2, textAlign: 'center' }}>
        Add Product
      </Typography>

      <TextField
        label="Product ID"
        name="product_id"
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ mb: 2 }}
        value={formValues.product_id}
        onChange={handleChange}
      />
      <TextField
        label="Product Name"
        name="product_name"
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ mb: 2 }}
        value={formValues.product_name}
        onChange={handleChange}
      />
      <TextField
        label="Product Image URL"
        name="product_image"
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ mb: 2 }}
        value={formValues.product_image}
        onChange={handleChange}
      />
      <TextField
        label="Product Price"
        name="product_price"
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ mb: 2 }}
        value={formValues.product_price}
        onChange={handleChange}
      />
      <TextField
        label="Product Quantity"
        name="product_quantity"
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ mb: 2 }}
        value={formValues.product_quantity}
        onChange={handleChange}
      />
      <TextField
        label="Product Description"
        name="product_text"
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ mb: 2 }}
        value={formValues.product_text}
        onChange={handleChange}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, mb: 2, backgroundColor: '#3fc1c9' }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddBeans;