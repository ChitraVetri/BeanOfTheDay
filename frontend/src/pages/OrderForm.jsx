import { useLocation } from 'react-router-dom';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { TableStyle, TypographyStyle } from '../styles';

const OrderSuccess = () => {
  const { state } = useLocation();
  const { order } = state || {};

  if (!order) return <Typography sx={TypographyStyle} >Invalid order data.</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" sx={TypographyStyle} mb={2}>
        ✅ Your order was placed successfully!
      </Typography>
      <Typography variant="body1" sx={TypographyStyle} mb={2}>
        Order ID: {order.orderId} | User: {order.user}
      </Typography>

      <Table component={Paper} sx={TableStyle}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Item</strong></TableCell>
            <TableCell><strong>Quantity</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.items.map(item => (
            <TableRow key={item.bean_id}>
              <TableCell>{item.bean_name}</TableCell>
              <TableCell>{item.bean_quantity}</TableCell>
              <TableCell>{item.bean_price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" sx={TypographyStyle} mt={3}>
        Thank you for your order! Your items will be shipped to you shortly.
        Total: £{order.total}
      </Typography>
    </Box>
  );
};

export default OrderSuccess;
