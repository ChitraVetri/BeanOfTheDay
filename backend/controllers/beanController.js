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
