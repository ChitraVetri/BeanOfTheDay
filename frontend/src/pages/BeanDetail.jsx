import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Slice';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { TypographyStyle, ButtonStyle } from '../styles';

const BeanDetail = () => {
  const { id } = useParams();
  const [bean, setBean] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/beans/${id}`)
      .then(res => {
        setBean(res.data)
        setLoading(false);
      })
      .catch(err => console.error('Failed to load bean:', err));
  }, [id]);

  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      Id: bean.Id,
      Name: bean.Name,
      Cost: bean.Cost,
      ImageUrl: bean.ImageUrl,
      quantity: 1,
    }));
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <img
        src={bean.ImageUrl}
        alt={bean.Name}
        style={{ width: '100%', height: 'auto', borderRadius: 8, marginBottom: 16 }}
      />
      <Typography variant="h4" sx={TypographyStyle}>{bean.Name}</Typography>
      <Typography variant="h6" sx={TypographyStyle}>Origin: {bean.Country}</Typography>
      <Typography variant="body1" sx={TypographyStyle}>{bean.Description || 'No description available.'}</Typography>
      <Typography variant="h5" sx={TypographyStyle}>Price: {bean.Cost}</Typography>
      <Button variant="contained" sx={ButtonStyle} onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </Box>
  );
};

export default BeanDetail;
