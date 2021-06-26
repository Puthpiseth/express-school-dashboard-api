const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apprenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Promo, {as: 'promo', foreignKey: 'promo_id'});
    }
  };
  Apprenant.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Apprenant',
  });
  return Apprenant;
};