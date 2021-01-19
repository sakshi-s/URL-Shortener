const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const static = express.static("public")

var admin = require("firebase-admin");

var serviceAccount = require("./url-shortener-604c1-firebase-adminsdk-nxkt6-ea0cf36ee7.json");
const { response } = require('express')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const urlsdb = admin.firestore().collection("urlsdb")

app.use(static)
app.use(bodyParser.json())

// app.use((req, res, next) => {
//     console.log("We intercepted the request");
//     next()
// })

app.get('/:short', (req, res) => {
  console.log(req.params)
  const short = req.params.short;
  
  const doc = urlsdb.doc(short)

  doc.get().then(response => {
    const data = response.data()
    if(data && data.url){
      res.redirect(301, data.url)
    }
    else {
      res.send("Uh oh, we don't have anything to show for that URL")
    }
  })
})

app.post('/admin/urls', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})