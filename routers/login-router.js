const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/users-model');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findBy('username', username).first();
        const validPassword = await bcrypt.compare(password, user.password);
        if (user && validPassword) {
            req.session.user = {
                id: user.id,
                username: user.username
            };
            console.log(req.session.user);
            res.status(200).json({
                message: `Logged in: ${user.username}`
            });
        } else {
            return res.status(401).json({
                message: 'You shall not pass!'
            });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;