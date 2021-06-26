const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAll,
  getOne,
  add,
  deleteOne,
  update,
} = require("../controllers/apprenants_controller");
const { ValidationError } = require("../helpers/errors");

const router = express.Router();

router.get("/", async (request, response) => {
  const apprenants = await getAll();
  response.status(OK).json(apprenants)
});

router.post("/", async (request, response) => {
  const apprenant = request.body;

  const newApprenant = await add(apprenant);
  response.status(CREATED).json(newApprenant);
});

router.get("/:id", async (request, response) => {
  const apprenant = await getOne(request.params.id);
  response.status(OK).json(apprenant);
});

router.put("/:id", async (request, response) => {
  const apprenant = request.body;

  const apprenantUpdated = await update(request.params.id, apprenant);
  response.status(OK).json(apprenantUpdated);
});

router.delete("/:id", async (request, response) => {
  await deleteOne(request.params.id);
  response.status(OK).json({ message: "L'apprenant est supprimé avec succès" });
});

module.exports = router;
