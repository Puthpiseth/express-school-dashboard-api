'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Apprenant);
      this.belongsToMany(models.Formateur, {as: 'promo_formateurs', through: 'formateurs_promos', foreignKey: 'promo_id' });
    }
  };
  Promo.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.UUID,
      onDelete: "CASCADE",
    },
  }, {
    sequelize,
    modelName: 'Promo',
  });
  return Promo;
};