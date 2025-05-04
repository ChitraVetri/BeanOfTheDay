// This file defines the routes for the bean-related API endpoints.
const express = require('express');
const router = express.Router();
const beanController = require('../controllers/beanController');

router.get('/getAllBeans', beanController.getAllBeans);

router.get('/bean-of-the-day', beanController.getBeanOfTheDay);

router.get('/searchBean', beanController.searchBeans);

router.post('/order', async (req, res) => {
    const { name, address, bean } = req.body;
    if (!name || !address || !bean) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    // Simulate DB insert (replace with actual DB insert)
    console.log('Received order:', req.body);
    res.status(201).json({ message: 'Order placed successfully!' });
  });

module.exports = router;