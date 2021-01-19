const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const static = express.static("public")

app.use(static)
app.use(bodyParser.json())

// app.use((req, res, next) => {
//     console.log("We intercepted the request");
//     next()
// })

app.get('/:short', (req, res) => {
  console.log(req.params)
  const short = req.params.short;
  res.send("We will redirect you to " + short)
})

app.post('/admin/urls', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})