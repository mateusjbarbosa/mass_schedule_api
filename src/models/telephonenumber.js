'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TelephoneNumber extends Model {
    static associate(models) {
      // define association here
    }
  };
  TelephoneNumber.init({
    number: DataTypes.STRING(10)
  }, {
    sequelize,
    modelName: 'TelephoneNumbers',
  });
  return TelephoneNumber;
};