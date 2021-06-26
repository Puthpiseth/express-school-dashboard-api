const express = require("express");

const { OK, CREATED } = require("../helpers/status_codes");

const {
    getAll,
    getOne,
    getByDay,
    getByPromo,
    getBySalle,
    add
} = require("../controllers/reservations_controller");

const router = express.Router();

router.get("/", async (request, response) => {
    const reservations = (request.query.day) 
    ? await getByDay(request.query.day) 
    : await getAll();
    response.status(OK).json(reservations);
});

router.get("/promo/:promo_id", async (request, response) => {
    const reservation = await getByPromo(request.params.promo_id);
    response.status(OK).json(reservation);
});

router.get("/salle/:salle_id", async (request, response) => {
    const reservation = await getBySalle(request.params.salle_id);
    response.status(OK).json(reservation);
});

router.get("/:id", async (request, response) => {
    const reservation = await getOne(request.params.id);
    response.status(OK).json(reservation);
});


router.post("/", async (request, response) => {
    const reservation = request.body;

    const newreservation = await add(reservation);
    response.status(CREATED).json(newreservation);
});

module.exports = router;
