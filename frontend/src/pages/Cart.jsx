import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Box, Breadcrumbs, Button, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust to your path
import { fetchCartItemsFromAPI } from '../redux/Slice'; // Adjust to your file structure
import { ButtonStyle, TableStyle } from '../styles';

const Cart = () => {
    const dispatch = useDispatch();
    const { user, userId } = useAuth();
    const cartItems = useSelector(state => state.carts.productData);

    useEffect(() => {
        if (user) {
            dispatch(fetchCartItemsFromAPI(user));
        }
    }, [user, dispatch]);

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const numericCost = parseFloat((item.bean_price || '0').replace(/[£]/g, '')) || 0;
            return total + numericCost * item.bean_quantity;
        }, 0);
    };

    const totalamount = getTotalAmount().toFixed(2);

    const handleIncreaseQuantity = async (id) => {
        const item = cartItems.find(i => i.bean_id === id);
        if (item) {
            console.log("item", item);
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/cart/updateQuantity`, {
                    Id: id,
                    quantity: item.bean_quantity + 1,
                    user: item.user_name
                });
                dispatch(fetchCartItemsFromAPI(user));
            } catch (error) {
                console.error('Failed to increase quantity:', error);
            }
        }
    };

    const handleDecreaseQuantity = async (id) => {
        const item = cartItems.find(i => i.bean_id === id);
        if (item && item.bean_quantity > 1) {
            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/cart/updateQuantity`, {
                    Id: id,
                    quantity: item.bean_quantity - 1,
                    user
                });
                dispatch(fetchCartItemsFromAPI(user));
            } catch (error) {
                console.error('Failed to decrease quantity:', error);
            }
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            console.log("id", id)
            console.log("user", user)
            await axios.delete(`${process.env.REACT_APP_API_URL}/cart/deletecart`, {
                data: {
                    beanId: id,
                    user: user
                }
            });
            dispatch(fetchCartItemsFromAPI(user));
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };
    const navigate = useNavigate();
    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert("Please add items to your cart before checking out.");
            return;
        }
        try {
            const orderData = {
                userId: userId,
                items: cartItems,
                total: totalamount
            };
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/beans/create-order`, orderData);
            dispatch(fetchCartItemsFromAPI(user));
            navigate('/OrderForm', { state: { order: response.data } });
        } catch (error) {
            console.error('Order placement failed:', error);
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link to="/" style={{ textDecoration: 'none', color: '#3f3f3f', fontWeight: 'bold' }}>Home</Link>
                <Typography color="text.primary">Cart</Typography>
            </Breadcrumbs>

            <TableContainer component={Paper}>
                <Table sx={TableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Price</strong></TableCell>
                            <TableCell><strong>Quantity</strong></TableCell>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell align="center"><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map(item => {
                            const price = parseFloat((item.bean_price || '0').replace(/[£]/g, '')) || 0;
                            const total = (price * item.bean_quantity).toFixed(2);
                            return (
                                <TableRow key={item.bean_id}>
                                    <TableCell>{item.bean_name}</TableCell>
                                    <TableCell>{item.bean_price}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDecreaseQuantity(item.bean_id)} disabled={item.bean_quantity <= 1}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <TextField
                                            value={item.bean_quantity}
                                            type="number"
                                            size="small"
                                            disabled
                                            sx={{ width: 70, mx: 1 }}
                                        />
                                        <IconButton onClick={() => handleIncreaseQuantity(item.bean_id)}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>£{total}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleRemoveItem(item.bean_id)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6">Total Amount: £{totalamount}</Typography>
                <Button variant="contained" color="primary" onClick={handleCheckout} sx={ButtonStyle}>Proceed to Checkout</Button>
            </Box>
        </Box>
    );
};

export default Cart;
