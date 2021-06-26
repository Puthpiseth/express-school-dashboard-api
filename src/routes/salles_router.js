const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");

const {
    getAll,
    getOne,
    add
} = require("../controllers/salles_controller");

const router = express.Router();

router.get("/", async (request, response) => {
    const salles = await getAll();
    response.status(OK).json(salles);
});

router.get("/:id", async (request, response) => {
    const salle = await getOne(request.params.id);
    response.status(OK).json(salle);
});

router.post("/", async (request, response) => {
    const salle = request.body;

    const newsalle = await add(salle);
    response.status(CREATED).json(newsalle);
});

module.exports = router;
