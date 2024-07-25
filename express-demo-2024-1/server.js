const express = require('express')
const app = express()
const port = 3000
let message = "Hello World! This is express-demo-2024-1"

app.get('/', (req, res) => {
  res.send(message)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})