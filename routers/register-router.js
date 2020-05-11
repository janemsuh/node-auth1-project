const express = require('express');
const Users = require('../models/users-model');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const username = req.body.username;
        const user = await Users.findBy('username', username).first();
        if (user) {
            return res.status(409).json({
                message: 'Username is already taken'
            });
        }
        // password is hashed before insertion within the add function
        res.status(201).json(await Users.add(req.body));
    } catch (err) {
        next(err);
    }
});

module.exports = router;