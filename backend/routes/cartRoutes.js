const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/getcartdetails', cartController.getCartDetails);
router.post('/createcart', cartController.createCart);
router.post('/updatecart', cartController.updateCart);
router.get('/totalquantity', cartController.getTotalQuantity);
router.delete('/delete/:productId', cartController.deleteCartItem);

module.exports = router;
