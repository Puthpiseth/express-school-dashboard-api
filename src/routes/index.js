const express = require("express");
require("express-async-errors");

const apprenantRouter = require("./apprenants_router");
const promoRouter = require("./promos_router");
const formateursRouter = require("./formateurs_router");
const sallesRouter = require('./salles_router');
const reservationRouter = require('./reservations_router');

const mainRouter = express.Router();

mainRouter.use("/apprenants", apprenantRouter);
mainRouter.use("/promos", promoRouter);
mainRouter.use("/formateurs", formateursRouter);
mainRouter.use("/salles", sallesRouter);
mainRouter.use("/reservations", reservationRouter);

module.exports = mainRouter;
