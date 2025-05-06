// This file defines the routes for the bean-related API endpoints.
const express = require('express');
const router = express.Router();
const beanController = require('../controllers/beanController');

router.get('/getAllBeans', beanController.getAllBeans); // Fetch all beans

router.get('/getBean/:id', beanController.getBeanById); // Fetch a specific bean by ID

router.get('/bean-of-the-day', beanController.getBeanOfTheDay);

router.get('/searchBean', beanController.searchBeans);

router.post('/create-order', beanController.createOrder);

module.exports = router;