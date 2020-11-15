const path = require('path')
const schemas = require('./schemas')
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
      schemas.category.validate([query])
      const foundCategory = await dbQueries.findOne(db, 'category', { _id })
      if (foundCategory) {
        await dbQueries.updateOne(db, 'category', { _id }, { ...query, lastModif: date })
      } else {
        await dbQueries.insertOne(db, 'category', { ...query, lastModif: date })
      }
      res.send("category added")
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
        list,
        languageList
      } = req.body
      const date = new Date()
      const groupQuery = {
        image,
        categoryId,
        _id,
      }
      schemas.vocabularyGroup.validate([groupQuery])
      if (languageList) {
        schemas.languageList.validate([{ languageList }])
        await dbQueries.updateOne(db, 'category', { _id: categoryId }, { $set: { languageList, lastModif: date } })
      } else {
        await dbQueries.updateOne(db, 'category', { _id: categoryId }, { $set: { lastModif: date } })
      }
      const finalList = list.map((item) => ({ ...item, groupId: _id, categoryId }))
      schemas.vocabularyItem.validate(finalList)
      const foundGroup = await dbQueries.findOne(db, 'vocabularyGroup', { _id: _id }, { _id: 1 })
      if (foundGroup) {
        await dbQueries.updateOne(db, 'vocabularyGroup', { _id }, { $set: { ...groupQuery, lastModif: date } })
        await Promise.all(finalList.map((item) => {
          return dbQueries.updateOne(db, 'vocabularyItem', { _id: item._id }, { $set: { ...item } })
        }))
      } else {
        await dbQueries.insertOne(db, 'vocabularyGroup', { ...groupQuery, lastModif: date })
        await dbQueries.insertMany(db, 'vocabularyItem', finalList)
      }

      res.send(foundGroup ? "vocabulary updated" : "vocabulary added")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.delete('/api/vocabulary', async (req, res) => {
    try {
      const {
        groupId,
        categoryId
      } = req.body
      const deletedDate = new Date()
      schemas._id.validate([{ _id: groupId }, { _id: categoryId }])
      await dbQueries.removeOne(db, 'vocabularyGroup', { _id: groupId })
      await dbQueries.removeMany(db, 'vocabularyItem', { groupId })
      await dbQueries.updateOne(db, 'category', { _id: categoryId }, { $set: { lastModif: deletedDate } })
      await dbQueries.insertOne(db, 'deletedItem', { groupId, categoryId, deletedDate })
      res.send("vocabulary deleted")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.delete('/api/category', async (req, res) => {
    try {
      const {
        categoryId,
      } = req.body
      const deletedDate = new Date()
      schemas._id.validate([{ _id: categoryId }])
      await dbQueries.removeOne(db, 'category', { _id: categoryId })
      await dbQueries.insertOne(db, 'deletedItem', { categoryId, deletedDate })
      await dbQueries.removeMany(db, 'vocabularyGroup', { categoryId })
      await dbQueries.removeMany(db, 'vocabularyItem', { categoryId })
      res.send("category deleted")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.get('/api/category', async (req, res) => {
    try {
      const {
        date,
      } = req.query
      let vocabularyCategories = []
      let vocabularyGroups = []
      let categoryIds = []
      if (date) {
        schemas.pull.validate([{ date }])
        vocabularyCategories = await dbQueries.find(db, 'category', { isPublic: true, lastModif: { gte: date } })
        categoryIds = vocabularyCategories.map((category) => category._id)
        vocabularyGroups = await dbQueries.find(db, 'vocabularyGroup', { lastModif: { gte: date }, categoryId: { $in: categoryIds } })
      } else {
        vocabularyCategories = await dbQueries.find(db, 'category', { isPublic: true })
        categoryIds = vocabularyCategories.map((category) => category._id)
        vocabularyGroups = await dbQueries.find(db, 'vocabularyGroup', { categoryId: { $in: categoryIds } })
      }
      vocabularyCategories = vocabularyCategories.map((item) => ({ ...item, lastModif: undefined }))
      vocabularyGroups = vocabularyGroups.map((item) => ({ ...item, lastModif: undefined, categoryId: undefined }))
      const vocabularyGroupIds = vocabularyGroups.map((group) => group._id)
      const vocabularyItems = await dbQueries.find(
        db,
        'vocabularyItem',
        { groupId: { $in: vocabularyGroupIds } },
      )

      const groupIdPushed = []
      vocabularyItems.forEach((vocItem) => {
        const categoryIndex = vocabularyCategories.findIndex((catItem) => catItem._id === vocItem.categoryId)
        const groupIndex = vocabularyGroups.findIndex((groupItem) => groupItem._id === vocItem.groupId)
        const vocabularyItem = {
          _id: vocItem._id,
          title: vocItem.title,
          audio: vocItem.audio
        }
        if (vocabularyGroups[groupIndex].list) {
          vocabularyGroups[groupIndex].list.push(vocabularyItem)
        } else {
          vocabularyGroups[groupIndex].list = [vocabularyItem]
        }

        if (vocabularyCategories[categoryIndex].items) {
          if (!groupIdPushed.includes(vocItem.groupId)) {
            vocabularyCategories[categoryIndex].items.push(vocabularyGroups[groupIndex])
          }
        } else {
          vocabularyCategories[categoryIndex].items = [vocabularyGroups[groupIndex]]
        }
        groupIdPushed.push(vocItem.groupId)
      })

      res.send({ data: vocabularyCategories })
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.get('/api/deleted', async (req, res) => {
    try {
      const {
        date,
      } = req.query
      let deletedIds = []
      if (date) {
        schemas.pull.validate([{ date }])
        deletedIds = await dbQueries.find(db, 'deletedItem', { deletedDate: { gte: date } })
      } else {
        deletedIds = await dbQueries.find(db, 'deletedItem', {})
      }
      res.send({ data: deletedIds })
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