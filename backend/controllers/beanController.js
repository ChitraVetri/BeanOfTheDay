const beanService = require('../services/beanService');

exports.getAllBeans = async (req, res) => {
  try {
    const beans = await beanService.getAllBeans();
    res.json(beans);
  } catch (err) {
    console.error('Error in getAllBeans:', err);
    res.status(500).json({ error: 'Failed to fetch beans.' });
  }
};  

exports.getBeanById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const bean = await beanService.getBeanById(id); // returns an array
    
    res.json(bean); // return single bean object
  } catch (err) {
    console.error('Error in getBeanById:', err);
    res.status(500).json({ error: 'Failed to fetch bean.' });
  }
};


exports.getBeanOfTheDay = async (req, res) => {
  try {
    const bean = await beanService.getBeanOfTheDay();
    res.json(bean);
  } catch (err) {
    console.error('Error in getBeanOfTheDay:', err);
    res.status(500).json({ error: 'Failed to get Bean of the Day.' });
  }
};

exports.searchBeans = async (req, res) => {
  try {
    const { query } = req.query; // e.g., ?query=Colombia
    const beans = await beanService.searchBeans(query);
    res.json(beans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
      const { userId, items, total } = req.body;
      const result = await beanService.createOrder(userId, items, total);
      res.status(201).json(result);
  } catch (error) {
      console.error('Error in orderController:', error);
      res.status(500).json({ message: 'Failed to place order' });
  }
};