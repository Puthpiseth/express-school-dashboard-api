const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Promo, {foreignKey: 'promo_id'});
            this.belongsTo(models.Salle, { foreignKey: 'salle_id'});
        }
    };
    Reservation.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        day: {
            type: DataTypes.DATEONLY
        },
    }, {
        sequelize,
        modelName: 'Reservation',
    });
    return Reservation;
};