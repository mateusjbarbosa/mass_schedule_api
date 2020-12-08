const Sequelize = require('sequelize')
const instance = require('../config')

const columns = {
  telephone_number: {
    type: Sequelize.STRING(11),
    allowNull: false
  },
  full_name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  date_birth: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  is_tithe: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  street: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  house_number: {
    type: Sequelize.STRING(5),
    allowNull: false
  },
  neighborhood: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  city: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  general_record: {
    type: Sequelize.STRING(11),
    allowNull: false
  },
  individual_record: {
    type: Sequelize.STRING(11),
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('faithful', 'secretary', 'admin'),
    allowNull: false,
    defaultValue: 'faithful'
  },
  celebration_allowed_count: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 3
  },
}

const options = {
  timestamps: true
}

module.exports = instance.define('user', columns, options)