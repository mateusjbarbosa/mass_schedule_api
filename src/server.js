const { json } = require('body-parser')
const express = require('express')

const generateTables = require('./database/generate_tables')

const app = express()

app.use(json())

app.get('/', (_, res) => {
  res
    .status(200)
    .send({
      'message': 'Welcome to Mass Schedule API!',
      'docs': "http://example.com/api/docs"
    })
})

generateTables.generate()

// Server up
app.listen(3000, () => {
  console.log('Server initialiazed on :3000')
})

module.exports = app