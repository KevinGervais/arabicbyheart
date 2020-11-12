const path = require('path')
const {
  vocabularyGroup,
  vocabularyItem,
  category,
  pull
} = require('./schemas')
const dbQueries = require('./dbQueries')
module.exports = function handleRequests(app, db) {
  app.post('/api/category', async (req, res) => {
    try {
      const {
        title,
        columnCount,
        isPublic,
        languageList,
        _id,
      } = req.body
      const date = new Date()
      const query = {
        title,
        columnCount,
        isPublic,
        languageList,
        _id,
      }
      category.validate([query])
      await dbQueries.insertOne(db, 'category', { ...query, lastModif: date })
      res.send({ message: "category added", date })
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })
  app.post('/api/vocabulary', async (req, res) => {
    try {
      const {
        image,
        _id,
        categoryId,
        list
      } = req.body
      const date = new Date()
      const groupQuery = {
        image,
        categoryId,
        _id,
      }
      vocabularyGroup.validate([groupQuery])
      vocabularyItem.validate(list.map((item) => ({ ...item, groupId: _id })))
      await dbQueries.insertOne(db, 'vocabularyGroup', { ...groupQuery, lastModif: date })
      await dbQueries.insertMany(db, 'vocabularyItem', list)

      res.send("history uploaded")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })
  app.get('/api/pull', async (req, res) => {
    try {
      const {
        date,

      } = req.query
      pull.validate([date])
      const publicCategories = await dbQueries.find(db, 'category', { public: true })
      // const categoryIds = publicCategories.map(() => )
      const vocabularyGroups = await dbQueries.find(db, 'vocabularyGroup', { lastModif: { gte: date } })
      res.send()
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })
  app.get('/new/vocabulary', async (req, res) => {
    try {
      dbQueries.insertOne(db, 'category', req.body)
      res.send("history uploaded")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.get('*/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })
}