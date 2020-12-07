const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res
    .status(200)
    .send({
      'message': 'Welcome to Mass Schedule API!',
      'docs': "http://example.com/api/docs"
    })
})

// Server up
app.listen(3000, () => {
  console.log('Server initialiazed on :3000')
})

module.exports = app