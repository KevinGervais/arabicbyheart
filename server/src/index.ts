import path from 'path'
import express, { Express } from 'express'
import cors from 'cors'
import { Db, MongoClient, MongoError } from 'mongodb'

import { handleRequests } from './requests'
const app = express()


// const isDev = !process.env.PORT
const isDev = false
const port = process.env.PORT || 8080

const dataBase = {
  urlDev: 'mongodb://localhost:27017',
  url: 'mongodb+srv://admin:9yr7xnjuwc@arabic-by-heart.toj33.mongodb.net',
  name: 'arabic-by-heart'
}

function startDatabase(): Promise<Db> {
  const { urlDev, url, name } = dataBase
  return new Promise((resolve: (db: Db) => void, reject: (err: MongoError) => void) => {
    MongoClient.connect(
      isDev ? urlDev : url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err: MongoError, client: MongoClient) => {
        if (err) { return reject(err) }
        console.log(`Connected to ${name} database`)
        try {
          resolve(client.db(name))
        } catch (err) {
          console.log("mongodb not connected...")
        }
      })
  })
}

console.log('server is running')

startDatabase().then((db: Db) => {
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })
  app.use(express.json())
  app.use(cors())
  app.use(express.static(path.join(__dirname, '../build')))
  app.enable('trust proxy')
  handleRequests(app, db)
})
