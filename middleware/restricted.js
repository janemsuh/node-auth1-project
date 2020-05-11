async function restricted(req, res, next) {
    try {
        if (req.session && req.session.user) {
            next();
        } else {
            res.status(401).json({
                message: 'Not logged in.'
            })
        }
    } catch (err) {
        next(err);
    }
};

module.exports = restricted;