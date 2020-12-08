const express = require('express')
const database = require('./database')
const middlewares = require('./middlewares')
const routes = require('./routes')
const app = express()

database()

middlewares(app)
routes(app)

// Server up
app.listen(3000, () => {
  console.log('Server initialiazed on :3000')
})

module.exports = app