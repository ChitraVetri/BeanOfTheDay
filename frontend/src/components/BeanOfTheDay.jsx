import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const BeanOfTheDay = () => {
  const [bean, setBean] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/beans/bean-of-the-day`)
      .then(res => setBean(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!bean) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5">Bean of the Day</Typography>
        <Typography>{bean.Name}</Typography>
        <Typography>Origin: {bean.origin}</Typography>
        <Typography>Flavor: {bean.flavor_profile}</Typography>
        <Typography>Price: ${bean.price}</Typography>
      </CardContent>
    </Card>
  );
};

export default BeanOfTheDay;
