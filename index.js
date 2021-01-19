const express = require('express')
const app = express()
const port = 3000

app.use((req, res, next) => {
    console.log("We intercepted the request");
    next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})