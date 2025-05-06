import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Box, Button, Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import { TypographyStyle, ButtonStyle } from '../styles';

export default function Home() {


    const [beans, setBeans] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/beans/bean-of-the-day`)
            .then(res => {
                setBeans(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load bean of the day.");
                setLoading(false);
            });
    }, []);

    if (loading) return <h2>Loading...</h2>;
    if (error) return <p>{error}</p>;
  
    
    return (
        <Box
            sx={{
                display: 'grid',
                columnGap: 1,
                rowGap: 1,
                mb: 2,
                gridTemplateColumns: {
                    xs: '1fr',    // 1 column on small screens
                    sm: '1fr 1fr' // 2 columns on medium and up
                },
            }}
        >
            <Box
                sx={{
                    backgroundImage: beans?.ImageUrl ? `url(${beans.ImageUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: { xs: '40vh', sm: '60vh' },
                    padding: '40px',
                }}
            />
            <Box sx={{ p: 2, height: { xs: 'auto', sm: '60vh' }, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px', gap: '10px' }}>
                <Typography
                    variant="h3"
                    sx={TypographyStyle}
                >
                    BEAN OF THE DAY
                </Typography>

                <Typography variant="h5" sx={TypographyStyle} >
                    {beans?.Name} From {beans?.Country}
                </Typography>
                <Typography variant="h6" sx={TypographyStyle} >
                    {beans?.Description}
                </Typography>
                <Link to="/Shop" style={{ textDecoration: 'none' }}><Button
                    variant="contained"
                    sx={ButtonStyle}>
                    Buy Beans Now
                </Button></Link>
            </Box>
        </Box>

    );
}
