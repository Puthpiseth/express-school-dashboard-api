const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Salle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsToMany(models.Reservation, {as: 'Salle', through: 'Reservations'});
    }
  };
  Salle.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING
    },
    capacity: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Salle',
  });
  return Salle;
};