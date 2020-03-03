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

server.use('/auth', authRouter);
server.use('/auth/user', authenticate, plannersRouter );
server.use('/', userRouter);

module.exports = server;