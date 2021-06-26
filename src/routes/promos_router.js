const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");

const {
  getAll,
  getOne,
  add,
} = require("../controllers/promos_controller");

const router = express.Router();

router.get("/", async (request, response) => {
  const promos = await getAll();
  response.status(OK).json(promos);
});

router.get("/:id", async (request, response) => {
  const promo = await getOne(request.params.id);
  response.status(OK).json(promo);
});

router.post("/", async (request, response) => {
  const promo = request.body;

  const newpromo = await add(promo);
  response.status(CREATED).json(newpromo);
});

module.exports = router;
