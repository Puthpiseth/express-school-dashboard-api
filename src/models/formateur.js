const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Promo, {as: 'formateur_promos', through: 'formateurs_promos', foreignKey: 'formateur_id'})
    }
  };
  Formateur.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    stack: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'Formateur',
  });
  return Formateur;
};