'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pcb extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pcb.init({
    name: DataTypes.STRING,
    productCode: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    image_url: DataTypes.STRING,
    bom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pcb',
  });
  return Pcb;
};