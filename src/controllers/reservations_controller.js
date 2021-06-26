const { Reservation, Salle, Promo } = require("../models");
const { BadRequestError, NotFoundError } = require("../helpers/errors");


const reservationsController = {
    getAll: async () => {
        const reservations = await Reservation.findAll({
            order: [["day", "ASC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] },
            raw: true,
        });
        return reservations;
    },
    getOne: async (id) => {
        const reservation = await Reservation.findOne({
            where: {
                id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Salle, Promo]
        });
        if (!reservation) {
            throw new NotFoundError("Ressource introuvable", "Cette reservation n'existe pas");
        }

        return reservation;
    },
    getByDay: async (day) => {
        const date = new Date(day);
        if (date == 'Invalid Date')
            throw new NotFoundError("Requete invalide", "Date au mauvais format");

        const reservation = await Reservation.findAll({
            where: {
                day
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Salle]
        });
        if (!reservation) {
            throw new NotFoundError("Ressource introuvable", "Cette reservation n'existe pas");
        }

        return reservation;
    },
    getByPromo: async (promo_id) => {
        const reservation = await Reservation.findAll({
            where: {
                promo_id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Salle]
        });
        if (!reservation) {
            throw new NotFoundError("Ressource introuvable", "Cette reservation n'existe pas");
        }

        return reservation;
    },
    getBySalle: async (salle_id) => {
        const reservation = await Reservation.findAll({
            where: {
                salle_id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: [Promo]
        });
        if (!reservation) {
            throw new NotFoundError("Ressource introuvable", "Cette reservation n'existe pas");
        }

        return reservation;
    },
    add: async (data) => {
        const { day, salle_id, promo_id } = data;

        const reservation = await Reservation.findOne({
            where: {
                day, salle_id
            }
        });
        if (reservation) {
            throw new BadRequestError("Ressource existante", "Une reservation a ce jour pour cette salle existe déjà");
        }

        const newreservation = await Reservation.create(data);

        return newreservation;
    },
};

module.exports = reservationsController;
