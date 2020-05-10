const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

function restrict() {
    const authError = {
        message: 'Invalid credentials',
    };

    return async (req, res, next) => {
        try {
            // required fields are not empty
            const { username, password } = req.headers;
            if (!username || !password) {
                return res.status(401).json(authError);
            };
            // user exists
            const user = await Users.findBy({ username }).first();
            if (!user) {
                return res.status(401).json(authError);
            };
            // valid password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json(authError);
            };
            // user is successfully authenticated
            next();
        } catch (err) {
            next(err);
        }
    }
};

module.exports = restrict;