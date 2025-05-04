const cartService = require('../services/cartService');

exports.getCartDetails = async (req, res) => {
    try {
        const result = await cartService.getAll();
        res.json(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.createCart = async (req, res) => {
    try {
        const result = await cartService.create(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.updateCart = async (req, res) => {
    try {
        const result = await cartService.update(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.getTotalQuantity = async (req, res) => {
    try {
        const result = await cartService.totalQuantity();
        res.status(200).json({ totalQuantity: result });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const result = await cartService.delete(req.params.productId);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json(err.message);
    }
};
