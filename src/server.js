const express = require('express')

let app = express()

// Server up
app.listen(3000, () => {
  console.log('Server initialiazed on :3000')
})