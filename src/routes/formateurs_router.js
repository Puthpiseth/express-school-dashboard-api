const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");
const {
  getAll,
  getOne,
  add,
  addPromo
} = require("../controllers/formateurs_controller");

const router = express.Router();

router.get("/", async (request, response) => {
  const formateurs = await getAll();
  response.status(OK).json(formateurs);
});

router.get("/:id", async (request, response) => {
  const formateur = await getOne(request.params.id);
  response.status(OK).json(formateur);
});


router.post("/", async (request, response) => {
  const formateurToAdd = request.body;
  
  const newFormateur = await add(formateurToAdd);
  response.status(CREATED).json(newFormateur);
});

router.post("/:id/addPromo", async (request, response) => {
  const formateur = await addPromo(request.params.id, request.body.promo_id);
  response.status(OK).json(formateur);
});

module.exports = router;
