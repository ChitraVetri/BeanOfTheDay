import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Slice';
import { Box, Typography, Button } from '@mui/material';
import { TypographyStyle, ButtonStyle } from '../styles';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

const BeanDetail = () => {
  const { id } = useParams();
  const {user} = useAuth(); // Get user info from context
  const [bean, setBean] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/beans/getBean/${id}`)
      .then(res => {
        setBean(res.data);
      })
      .catch(err => console.error('Failed to load bean:', err));
  }, [id]);

  const dispatch = useDispatch()

  const handleAddToCart = async () => {
    const cartItem = {
      Id: bean.Id,
      Name: bean.Name,
      Cost: bean.Cost,
      ImageUrl: bean.ImageUrl,      
      User: user // Assuming user is the username or ID
    };

    // Dispatch to Redux
    dispatch(addToCart(cartItem));

    // Persist to database
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/cart/updatecart`, cartItem);
    } catch (error) {
      console.error('Failed to update cart in DB:', error);
    }
  };

  if (!bean) {
    return <Typography>Loading...</Typography>; // or a spinner
  }
  return (
    <Box
      sx={{
        display: 'grid',
        columnGap: 1,
        rowGap: 1,
        gridTemplateColumns: {
          xs: '1fr',    // 1 column on small screens
          sm: '1fr 1fr' // 2 columns on medium and up
        },
      }}
    >      <Box
        sx={{
          backgroundImage: bean?.ImageUrl ? `url(${bean.ImageUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '40vh', sm: '60vh' },
          padding: '40px',
        }}
      />
      <Box sx={{ p: 2, height: { xs: 'auto', sm: '60vh' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', gap: '10px' }}>
        <Typography variant="h3" sx={TypographyStyle}>{bean.Name}</Typography>
        <Typography variant="h5" sx={TypographyStyle}>Origin: {bean.Country}</Typography>
        <Typography variant="body1" sx={TypographyStyle}>{bean.Description || 'No description available.'}</Typography>
        <Typography variant="h6" sx={TypographyStyle}>Price: {bean.Cost}</Typography>
        <Button variant="contained" sx={ButtonStyle} onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

export default BeanDetail;
