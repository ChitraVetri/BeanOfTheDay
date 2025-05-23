const cartService = require('../services/cartService');

exports.getCartDetails = async (req, res) => {
    try {
        const user = req.query.user?.trim();
        const result = await cartService.getAll(user);
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
exports.updateQuantity = async (req, res) => {
    try {
        const { Id, quantity, user } = req.body;
        if (!Id || quantity < 1) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        await cartService.updateQuantity(Id, quantity, user);
        res.status(200).json({ message: 'Quantity updated successfully' });
    } catch (err) {
        console.error('Error in updateQuantity controller:', err);
        res.status(500).json({ error: 'Failed to update quantity' });
    }
};

exports.getTotalQuantity = async (req, res) => {
    try {
        const user = req.query.user?.trim();
        const result = await cartService.totalQuantity(user);
        res.status(200).json({ totalQuantity: result });
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const { user, beanId } = req.body;
        const result = await cartService.delete(beanId, user);
        if (!result) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json(err.message);
    }
};
