import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Box, Breadcrumbs, Button,Typography, Divider, IconButton, TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { updateQuantity, removeFromCart } from '../redux/Slice'; // Make sure you import your cart actions
import { TypographyStyle, ButtonStyle,TableStyle} from '../styles';
import axios from '../api/axios';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.carts.productData);
    //    const totalAmount = cartItems.reduce((sum, item) => sum + item.product_quantity * item.Cost, 0);
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
        // Redux: Remove from local cart
        dispatch(removeFromCart(id));

        // Backend: Remove from DB
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/cart/delete/${id}`);
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
                        {cartItems.map(item => {
                            const price = parseFloat(item.Cost.replace(/[^\d.]/g, '')) || 0;
                            const total = (price * item.product_quantity).toFixed(2);
                            return (
                                <TableRow key={item.Id}>
                                    <TableCell>{item.Name}</TableCell>
                                    <TableCell>{item.Cost}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDecreaseQuantity(item.Id)} disabled={item.product_quantity <= 1}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <TextField
                                            value={item.product_quantity}
                                            onChange={(e) =>
                                                dispatch(updateQuantity({ id: item.Id, quantity: parseInt(e.target.value) || 1 }))
                                            }
                                            type="number"
                                            size="small"
                                            sx={{ width: 50, mx: 1 }}
                                        />
                                        <IconButton onClick={() => handleIncreaseQuantity(item.Id)}>
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
