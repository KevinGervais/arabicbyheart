const path = require('path')
const express = require('express')
const app = express()
const handleRequests = require('./requests')
const cors = require('cors')

const MongoClient = require('mongodb').MongoClient

// const isDev = !process.env.PORT
const isDev = false
const port = process.env.PORT || 8080

const dataBase = {
  urlDev: 'mongodb://localhost:27017',
  url: 'mongodb+srv://admin:9yr7xnjuwc@arabic-by-heart.toj33.mongodb.net',
  name: 'arabic-by-heart'
}

function startDatabase() {
  const { urlDev, url, name } = dataBase
  return new Promise((resolve, reject) => {
    MongoClient.connect(isDev ? urlDev : url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
      if (err) return reject(err)
      console.log(`Connected to ${name} database`)
      try {
        resolve(client.db(name))
      } catch (err) {
      }
    })
  })
}

console.log('server is running')

startDatabase().then((db) => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
  app.use(express.json())
  app.use(cors())
  app.use(express.static(path.join(__dirname, '../build')))
  app.enable('trust proxy')
  handleRequests(app, db)
})
