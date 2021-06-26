const { Promo } = require("../models");
const { BadRequestError, NotFoundError } = require("../helpers/errors");


const promosController = {
  getAll: async () => {
    const Promos = await Promo.findAll({
      order: [["name", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
    });
    return Promos;
  },
  getOne: async (id) => {
    const promo = await Promo.findOne({
      where: {
        id
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: ['promo_formateurs', 'Apprenants']
    });
    if (!promo) {
      throw new NotFoundError("Ressource introuvable", "Cette promo n'existe pas");
    }

    return promo;
  },
  add: async (data) => {
    const { name } = data;

    const promo = await Promo.findOne({
      where: {
        name
      }
    });
    if (promo) {
      throw new BadRequestError("Ressource existante", "Cette promo existe déjà");
    }

    const newPromo = await Promo.create(data);

    return newPromo;
  },
};

module.exports = promosController;
