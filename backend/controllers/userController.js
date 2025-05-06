const userService = require('../services/userService');

exports.registerUser = async (req, res) => {
    try {
        await userService.register(req.body);
        res.json({ message: "User successfully registered" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const token = await userService.login(req.body);
        res.send(token);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};
