const { Salle } = require("../models");
const { BadRequestError, NotFoundError } = require("../helpers/errors");


const sallesController = {
    getAll: async () => {
        const salles = await Salle.findAll({
            order: [["name", "ASC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] },
            raw: true,
        });
        return salles;
    },
    getOne: async (id) => {
        const salle = await Salle.findOne({
            where: {
                id
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        if (!salle) {
            throw new NotFoundError("Ressource introuvable", "Cette salle n'existe pas");
        }

        return salle;
    },
    add: async (data) => {
        const { name } = data;

        const salle = await Salle.findOne({
            where: {
                name
            }
        });
        if (salle) {
            throw new BadRequestError("Ressource existante", "Cette salle existe déjà");
        }

        const newsalle = await Salle.create(data);

        return newsalle;
    },
};

module.exports = sallesController;
