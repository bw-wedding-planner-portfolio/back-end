const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/authRouter.js');
const plannersRouter = require('../planners/plannersRoutes');
const userRouter = require('../users/userRoutes');
const server = express();

server.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/auth', authRouter);
server.use('/auth/user', authenticate, plannersRouter );
server.use('/', userRouter);

module.exports = server;