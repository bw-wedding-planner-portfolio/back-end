const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/authRouter.js');
const plannersRouter = require('../planners/plannersRoutes');
const userRouter = require('../users/userRoutes');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Origin,X-Auth,X-Requested-With,Content-Type,Accept,content-type,application/json,x-auth,Access-Control-Request-Method,Access-Control-Request-Headers");
    next();
});

server.use('/auth', authRouter);
server.use('/auth/user', authenticate, plannersRouter );
server.use('/', userRouter);

module.exports = server;