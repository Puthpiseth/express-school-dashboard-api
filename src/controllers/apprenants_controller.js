const { Apprenant, Promo } = require("../models");
const { NotFoundError, BadRequestError } = require("../helpers/errors");

const apprenantsController = {
  getAll: async () => {
    const apprenants = await Apprenant.findAll({
      order: [["firstname", "ASC"]],
      attributes: {exclude: ["createdAt", "updatedAt"]},
      raw: true,
    });
    return apprenants;
  },

  getOne: async (id) => {
    const apprenant = await Apprenant.findOne({
      where: {
        id
      },
      attributes: {exclude: ["createdAt", "updatedAt", "PromoId", "promo_id"]},
      include: 'promo'
    });
    if (!apprenant) {
      throw new NotFoundError("Ressource introuvable", "Ce Apprenant n'existe pas");
    }

    return apprenant;
  },

  add: async (data) => {
    const {firstname, lastname, promo_id} = data;
    
    const apprenant = await Apprenant.findOne({
      where: {
        firstname, lastname
      }
    });

    if (apprenant) {
      throw new BadRequestError("Ressource existante", "Ce Apprenant existe déjà");
    }

    const newApprenant = await Apprenant.create({firstname, lastname});
    
    if (promo_id) {
      const promo = await Promo.findOne({
        where: {
          id: promo_id
        },
        attributes: { exclude: ["createdAt", "updatedAt"] }
      });
  
      if (!promo) {
        throw new NotFoundError("Ressource introuvable", "Cette promo n'existe pas");
      }
      else {
        newApprenant.setPromo(promo_id);
        promo.addApprenant(newApprenant);
      }
    }

    return newApprenant;
  },

  update: async (id, data) => {
    const apprenantFound = await Apprenant.findOne({
      where: { id },
    });
    if (!apprenantFound) {
      throw new NotFoundError("Ressource introuvable", "Ce Apprenant n'existe pas");
    }

    await apprenantFound.update(data);

    const apprenant = await Apprenant.findOne({
      where: {
        id
      },
      attributes: {exclude: ["createdAt", "updatedAt"]},
    }); 

    return apprenant;
  },

  deleteOne: async (id) => {
    const apprenantFound = await Apprenant.findOne({
      where: { id },
    });
    if (!apprenantFound) {
      throw new NotFoundError("Ressource introuvable", "Ce Apprenant n'existe pas");
    }

    await Apprenant.destroy({
      where: { id },
    });
  },
};

module.exports = apprenantsController;
