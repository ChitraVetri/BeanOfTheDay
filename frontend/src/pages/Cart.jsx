import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Box, Breadcrumbs, Button, Typography, Divider, IconButton, TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { updateQuantity, removeFromCart } from '../redux/Slice'; // Make sure you import your cart actions
import { TypographyStyle, ButtonStyle, TableStyle } from '../styles';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Cart = () => {

    const { user } = useAuth(); // Get user info from context
    const cartItems = useSelector(state => state.carts.productData);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        console.log("user", user);
        axios.get(`${process.env.REACT_APP_API_URL}/cart/getcartdetails`, {
            params: { user }
        })
            .then(res => setTableData(res.data))
            .catch(err => console.error('Failed to load carts:', err));
    }, [user]);

    const dispatch = useDispatch();

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => {
            const numericCost = parseFloat(item.Cost.replace(/[£]/g, '')) || 0;
            return total + numericCost * item.product_quantity;
        }, 0);
    };

    const totalAmount = getTotalAmount().toFixed(2);

    const handleIncreaseQuantity = async (id) => {
        const item = cartItems.find(item => item.Id === id);
        if (item) {
            dispatch(updateQuantity({ id: item.Id, quantity: 1 }));

            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/cart/updateQuantity`, {
                    Id: item.Id,
                    quantity: item.product_quantity + 1,
                });
            } catch (error) {
                console.error('Failed to increase quantity in DB:', error);
            }
        }
    };


    const handleDecreaseQuantity = async (id) => {
        const item = cartItems.find(item => item.Id === id);
        if (item && item.product_quantity > 1) {
            dispatch(updateQuantity({ id: item.Id, quantity: -1 }));

            try {
                await axios.put(`${process.env.REACT_APP_API_URL}/cart/updatecart`, {
                    Id: item.Id,
                    quantity: item.product_quantity - 1,
                });
            } catch (error) {
                console.error('Failed to decrease quantity in DB:', error);
            }
        }
    };

    const handleRemoveItem = async (id) => {
        dispatch(removeFromCart(id));
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/cart/delete/${id}`, {
                params: { user }
            });
        } catch (error) {
            console.error('Failed to remove item from DB cart:', error);
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
                        {tableData.map(item => {
                            const price = parseFloat(item.bean_price.replace(/[£]/g, ''))  || 0;
                            const total = (price * item.bean_quantity).toFixed(2);
                            return (
                                <TableRow key={item.bean_id}>
                                    <TableCell>{item.bean_name}</TableCell>
                                    <TableCell>{item.bean_price}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDecreaseQuantity(item.Id)} disabled={item.bean_quantity <= 1}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <TextField
                                            value={item.bean_quantity}
                                            onChange={(e) =>
                                                dispatch(updateQuantity({ id: item.bean_id, quantity: parseInt(e.target.value) || 1 }))
                                            }
                                            type="number"
                                            size="small"
                                            sx={{ width: 50, mx: 1 }}
                                        />
                                        <IconButton onClick={() => handleIncreaseQuantity(item.bean_id)}>
                                            <AddIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>£{total}</TableCell>
                                    <TableCell align="center">
                                        <IconButton onClick={() => handleRemoveItem(item.Id)}>
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

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 4 }}>
                <Typography variant="h6" sx={TypographyStyle}>Total Amount: £{totalAmount}</Typography>
                <Button variant="contained" color="primary" sx={ButtonStyle}>Proceed to Checkout</Button>
            </Box>
        </Box>
    );
};

export default Cart;
