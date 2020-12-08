const Sequelize = require('sequelize')

const config = {
  development: {
    "username": "postgres",
    "password": "root",
    "database": "mass_schedule_database",
    "host": "postgresql",
    "dialect": "postgres"
  }
  // test: {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "postgresql",
  //   "dialect": "postgres"
  // },
  // production: {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "postgresql",
  //   "dialect": "postgres"
  // }
}

const instance = new Sequelize(
  config.development['database'],
  config.development['username'],
  config.development['password'],
  {
    host: config.development['host'],
    dialect: config.development['dialect']
  }
)

module.exports = instance