import path from 'path'
import { Db } from 'mongodb'
import { Express, Request, Response } from 'express'

import { AddCategoryQuery, AddVocabularyQuery } from "../../src/requests/model"

import { schemas } from './schemas'
import { dbQueries } from './dbQueries'
export function handleRequests(app: Express, db: Db): void {

  app.post('/api/category', async (req: Request, res: Response) => {
    try {
      const {
        title,
        isPublic,
        _id,
      } = req.body

      const date = new Date()

      const query: AddCategoryQuery = {
        title,
        isPublic,
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

  app.post('/api/vocabulary', async (req: Request, res: Response) => {
    try {
      const {
        image,
        _id,
        categoryId,
        languageItems
      } = req.body

      const date = new Date()

      const vocabularyQuery: AddVocabularyQuery = {
        languageItems,
        image,
        categoryId,
        _id,
      }

      schemas.vocabulary.validate([{ ...vocabularyQuery, languageItems: undefined }])
      schemas.translation.validate(Object.values(languageItems))

      await dbQueries.updateOne(db, 'category', { _id: categoryId }, { $set: { lastModif: date } })
      const foundGroup = await dbQueries.findOne(db, 'vocabulary', { _id }, { _id: 1 })
      if (foundGroup) {
        await dbQueries.updateOne(db, "vocabulary", { _id }, { $set: { ...vocabularyQuery, lastModif: date } })
      } else {
        await dbQueries.insertOne(db, 'vocabulary', { ...vocabularyQuery, lastModif: date })
      }

      res.send(foundGroup ? "vocabulary updated" : "vocabulary added")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.delete('/api/vocabulary', async (req: Request, res: Response) => {
    try {
      const {
        groupId,
        categoryId
      } = req.body

      const deletedDate = new Date()

      schemas._id.validate([{ _id: groupId }, { _id: categoryId }])

      await dbQueries.deleteOne(db, 'vocabulary', { _id: groupId })
      await dbQueries.updateOne(db, 'category', { _id: categoryId }, { $set: { lastModif: deletedDate } })
      await dbQueries.insertOne(db, 'deletedLog', { groupId, categoryId, deletedDate })
      res.send("vocabulary deleted")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.delete('/api/category', async (req: Request, res: Response) => {
    try {
      const {
        categoryId,
      } = req.body
      const deletedDate = new Date()

      schemas._id.validate([{ _id: categoryId }])

      await dbQueries.deleteOne(db, 'category', { _id: categoryId })
      await dbQueries.insertOne(db, 'deletedLog', { categoryId, deletedDate })
      await dbQueries.deleteMany(db, 'vocabulary', { categoryId })
      res.send("category deleted")
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.get('/api/category', async (req: Request, res: Response) => {
    try {
      const date: string = req.query.date as string

      let vocabularyCategories = []
      let vocabularyGroups = []
      let categoryIds = []
      if (date) {
        schemas.pull.validate([{ date }])
        vocabularyCategories = await dbQueries.findMany(db, 'category', { isPublic: true, lastModif: { $gte: new Date(date) } })
        categoryIds = vocabularyCategories.map((category: any) => category._id)
        vocabularyGroups = await dbQueries.findMany(db, 'vocabulary', { lastModif: { $gte: new Date(date) }, categoryId: { $in: categoryIds } })
      } else {
        vocabularyCategories = await dbQueries.findMany(db, 'category', { isPublic: true })
        categoryIds = vocabularyCategories.map((category: any) => category._id)
        vocabularyGroups = await dbQueries.findMany(db, 'vocabulary', { categoryId: { $in: categoryIds } })
      }
      vocabularyCategories = vocabularyCategories.map((item: any) => ({ ...item, lastModif: undefined }))
      vocabularyGroups = vocabularyGroups.map((item: any) => ({ ...item, lastModif: undefined, categoryId: undefined }))

      res.send({ data: vocabularyCategories })
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.get('/api/deleted', async (req: Request, res: Response) => {
    try {
      const date: string = req.query.date as string

      let deletedIds = []
      if (date) {
        schemas.pull.validate([{ date }])
        deletedIds = await dbQueries.findMany(db, 'deletedLog', { deletedDate: { $gte: new Date(date) } })
      } else {
        deletedIds = await dbQueries.findMany(db, 'deletedLog', {})
      }
      res.send({ data: deletedIds })
    } catch (error) {
      res.status(400).send({
        message: error.toString()
      })
    }
  })

  app.get('*/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })
}