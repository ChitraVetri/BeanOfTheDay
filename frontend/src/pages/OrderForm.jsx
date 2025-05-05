import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';

export default function OrderForm() {
  const [form, setForm] = useState({ name: '', address: '', bean: '' });

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submit order:', form);
    // Future: post to backend
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Order Beans</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Your Name" margin="normal"
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <TextField fullWidth label="Address" margin="normal"
          onChange={e => setForm({ ...form, address: e.target.value })} />
        <TextField fullWidth label="Bean Name" margin="normal"
          onChange={e => setForm({ ...form, bean: e.target.value })} />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Place Order</Button>
      </form>
    </Container>
  );
}
