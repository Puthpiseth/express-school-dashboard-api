const { Formateur, Promo } = require("../models");
const { BadRequestError, NotFoundError } = require("../helpers/errors");

const formateurController = {
  getAll: async () => {
    const formateurs = await Formateur.findAll({
      order: [["firstname", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
      raw: true,
    });
    return formateurs;
  },
  getOne: async (id) => {
    const formateur = await Formateur.findOne({
      where: {
        id
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: 'formateur_promos'
    });
    if (!formateur) {
      throw new NotFoundError("Ressource introuvable", "Ce Formateur n'existe pas");
    }

    return formateur;
  },
  add: async (data) => {
    const {firstname, lastname, promo_id} = data;

    const formateur = await Formateur.findOne({
      where: {
        firstname,
        lastname
      },
      attributes: {exclude: ['PromoId']}
    });

    if (formateur) {
      throw new BadRequestError("Ressource existante", "Le Formateur existe déjà");
    }

    const newFormateur = await Formateur.create(data);
    
    if (promo_id)
      newFormateur.addFormateur_promos(promo_id);

    return newFormateur;
  },
  addPromo: async (id, promo_id) => {

    const formateur = await Formateur.findOne({
      where: {
        id
      },
      attributes: { exclude: ['PromoId'] }
    });

    if (!formateur) {
      throw new BadRequestError("Ressource inexistante", "Le Formateur n'existe pas");
    }

    const promo = await Promo.findOne({
      where: {
        id: promo_id
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!promo) {
      throw new NotFoundError("Ressource introuvable", "Cette promo n'existe pas");
    }


    formateur.addFormateur_promos(promo_id);

    return formateur;
  },
};

module.exports = formateurController;
