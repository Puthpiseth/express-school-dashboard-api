const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const jwt = require('jsonwebtoken');

const routes = require("./routes");

const { notFoundHandler, errorLogger, errorHandler } = require("./middlewares");

const server = express();

server.use(helmet());
server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use("/api", cors());

server.use('/api/admin/auth', (req, res) => {
    if (req.body.password == process.env.ADMIN_PASSWORD && req.body.username == process.env.ADMIN_USERNAME) {
        const token = jwt.sign({}, process.env.JWT_SECRET);
        res.status(200).json({ok: true, success: true, token, message: 'successfully authenticated'});
    }
    else
        res.status(403).json({ok: false, success: false, message: 'Identifiant incorrecte'})
});

const authMiddleware = async (req, res, next) => {
    const token = req.body.token || req.headers.token;
    if (!token)
        res.status(403).json({ok: false, success: false, message: 'no token provided'});
    else {
        try {
            await jwt.decode(token, process.env.JWT_SECRET);
            next();
        } catch (error) {
            console.error(error);
            res.status(403).json({ok: false, success: false, message: 'token invalid'});
        }
    }
}

server.use(authMiddleware);

server.use("/api", routes);

server.use("*", notFoundHandler);
server.use(errorLogger);
server.use(errorHandler);

module.exports = server;
