var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const User = require('../modal/userDetail_model.js');
const { request, response } = require('../app');


router.post('/createuser', async (req, res) => {
    try {
        const userInfo =
        {
            user_id: uuidv4(),
            user_email: req.body.user_email,
            user_name: req.body.user_name,
            user_password: await bcrypt.hash(req.body.user_password, 10),
            role: "user"
        }
        await User.create({ ...userInfo })
        res.json({ message: "User successfully registered" })
    } catch (err) {
        res.status(500).json(err.message)
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ user_name: username })
        if (user) {
            const isPasswordMatched = await bcrypt.compare(password, user.user_password)
            if (isPasswordMatched) {
                //JWT Token sent
                const token = jwt.sign({ user_name: user.user_name, role: user.role }, "authlogin", { expiresIn: '1h' })
                res.send(token)
            }
            else {
                res.status(401).json({ message: "Authentication failed, username or password is incorrect" })
            }
        }
        else {
            res.status(401).json({ message: "Username or Password is incorrect" })
        }
    } catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router;