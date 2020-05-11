const express = require("express");
const server = express();
const port = 5000;

const session = require("express-session");
const usersRouter = require('./routers/users-router');
const loginRouter = require('./routers/login-router');
const registerRouter = require('./routers/register-router');

const sessionConfig = {
    name: "chewy-cookie",
    secret: "shhh",
    cookie: {
        maxAge: 3600 * 1000,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
};

server.use(express.json());
server.use(session(sessionConfig));

server.get('/', (req, res) => {
    res.json({
        message: 'The API is up'
    })
});

server.use('/register', registerRouter);
server.use('/login', loginRouter);
server.use('/users', usersRouter);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});