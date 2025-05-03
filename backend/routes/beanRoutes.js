// This file defines the routes for the bean-related API endpoints.
const express = require('express');
const router = express.Router();
const beanController = require('../controllers/beanController');

router.get('/getAllBeans', beanController.getAllBeans);

router.get('/bean-of-the-day', beanController.getBeanOfTheDay);

router.get('/searchBean', beanController.searchBeans);


module.exports = router;