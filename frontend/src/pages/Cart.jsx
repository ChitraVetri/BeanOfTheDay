import { Box, Breadcrumbs, Button, Divider, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeFromCart } from "../redux/Slice";
import { useDispatch } from 'react-redux';


function Cart() {

    const data = useSelector(state => state.carts.productData)
    const [tableData, setTableData] = useState([]);

    async function fetchCartData() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/getcartdetails`)
        const results = await response.json();
        setTableData(results)
        setTotalAmount(calculateTotal(results));  // Calculate total with data
    }

    fetchCartData()


    function calculateTotal(data) {
        return data.reduce((acc, item) => acc + item.product_price * item.product_quantity, 0);
    }
    const [totalAmount, setTotalAmount] = useState(tableData.reduce((acc, item) => acc + item.product_price * item.product_quantity, 0))


    function handleQuantityChange(id, quantity) {
        setTableData((prevData) => {
            const updatedData = prevData.map(product =>
                product.product_id === id ? { ...product, product_quantity: Number(quantity) } : product
            );
            setTotalAmount(calculateTotal(updatedData));  // Calculate total with updated data
            return updatedData;
        });
    }

    const dispatch = useDispatch()

    async function fetchCartDelete(productId) {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/delete/${productId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log(`Resource with ID ${productId} deleted successfully.`);
        } else {
            console.error('Failed to delete the resource:', response.status);
        }
    }

    const handleDelete = (itemId) => {
        dispatch(removeFromCart(itemId));
        fetchCartDelete(itemId);
    };
    return (
        <div>
            <Breadcrumbs>
                <Link to="/home">
                    Home
                </Link>
                <Link>
                    Shopping Cart
                </Link>

            </Breadcrumbs>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Product
                        </TableCell>
                        <TableCell>
                            Price
                        </TableCell>
                        <TableCell>
                            Quantity
                        </TableCell>
                        <TableCell>
                            Total
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((product) => {
                        return <TableRow key={product.product_name}>
                            <TableCell>
                                {product.product_name}
                            </TableCell>
                            <TableCell>
                                $ {product.product_price}
                            </TableCell>
                            <TableCell sx={{
                                width: "16px",
                                height: "16px",

                            }}>
                                <TextField onChange={(e) => handleQuantityChange(product.product_id, e.target.value)} sx={{ textAlign: "center" }} value={product.product_quantity}></TextField>
                            </TableCell>
                            <TableCell>
                                $ {product.product_price * product.product_quantity}
                            </TableCell>
                            <TableCell>
                                <DeleteIcon color="error" onClick={() => handleDelete(product.product_id)} />
                            </TableCell>
                        </TableRow>

                    })}
                </TableBody>
            </Table>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "30%",
                marginTop: "30px"
            }}>
                <Typography variant="h4">
                    Cart Totals
                </Typography>

                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Typography variant="p">
                        subtotal
                    </Typography>
                    <Typography variant="p">
                        $ {totalAmount}
                    </Typography>

                </Box>

                <Divider />


                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Typography variant="p">
                        Shipping Fee
                    </Typography>
                    <Typography variant="p">
                        free
                    </Typography>

                </Box>


                <Divider />
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Typography variant="p">
                        Total
                    </Typography>
                    <Typography variant="p">
                        $ {totalAmount}
                    </Typography>
                </Box>
                <Button variant="contained" sx={{ backgroundColor: '#3fc1c9', fontWeight: 'bold', width: "fit-content" }}>Proceed Checkout</Button>

            </Box>


        </div>

    )
}
export default Cart