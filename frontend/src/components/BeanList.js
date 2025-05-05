import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Card, Box, CardActionArea, CardMedia, CardContent, Typography, Breadcrumbs } from '@mui/material';
import { Link } from "react-router-dom";
import { TypographyStyle } from '../styles';
import Pagination from '@mui/material/Pagination';

export default function BeanList() {
    const [beans, setBeans] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Adjust per your grid layout    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/beans/getAllBeans`)
            .then(res => setBeans(res.data))
            .catch(err => console.error('Failed to load beans:', err));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBeans = beans.slice(indexOfFirstItem, indexOfLastItem);
    
    return (
        <>
            <Box sx={{
                px: { xs: 2, sm: 4 },
                py: { xs: 2, sm: 5 },
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                gap: 3
            }}>
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link to="/home" style={{ textDecoration: 'none', color: '#3f3f3f', fontWeight: 'bold' }}>Home</Link>
                    <Typography color="text.primary">Shop</Typography>
                </Breadcrumbs>
                <Box sx={{
                    display: 'grid',
                    gap: 3,
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                }}>
                    {currentBeans.map((bean) => (
                        <Card key={bean.Id} sx={{ maxWidth: 345 }}>
                            <CardActionArea sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <Link to={`/BeanDetails/${bean.Id}`} style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={bean.ImageUrl}
                                        alt={bean.Name}
                                    />
                                </Link>
                                <CardContent>
                                    <Typography variant="h5" component="div" sx={TypographyStyle}>
                                        {bean.Name}
                                    </Typography>
                                    <Typography variant="h6" component="div" sx={TypographyStyle}>
                                        {bean.Cost}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <Pagination
                        count={Math.ceil(beans.length / itemsPerPage)}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                        shape="rounded"
                        size="large"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                fontWeight: 'bold',
                                color: '#2c2c2c',
                                '&.Mui-selected': {
                                    backgroundColor: '#8cac89',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#7aa878'
                                    }
                                }
                            }
                        }}
                    />
                </Box>  </Box >
        </>
    );
}
