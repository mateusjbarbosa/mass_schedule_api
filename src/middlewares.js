const { json } = require('body-parser')

module.exports = app => {
  app.use(json())
}