import { CollectionInsertOneOptions, Db, FilterQuery, FindOneOptions, MongoError, UpdateQuery, UpdateWriteOpResult } from "mongodb"

import { Collections } from "../model"

class DbQueries {

  insertOne(
    db: Db,
    collection: Collections,
    query: any,
    options?: CollectionInsertOneOptions
  ): Promise<string> {
    return new Promise((resolve: (_id: string) => void, reject: (error: string) => void) => {
      db.collection(collection).insertOne(query, options, (err: MongoError) => {
        if (err) { reject(err.message) }
        else { resolve(query._id) }
      })
    })
  }

  insertMany(db: Db, collection: Collections, array: any[]): Promise<string[]> {
    return new Promise((resolve: (_ids: string[]) => void, reject: (error: string) => void) => {
      db.collection(collection).insertMany(array, (err: MongoError) => {
        if (err) { reject(err.message) }
        else { resolve(array.map((obj: any) => obj._id)) }
      })
    })
  }
  deleteOne(db: Db, collection: Collections, query: FilterQuery<any>): Promise<string> {
    return new Promise((resolve: (_id: string) => void, reject: (error: string) => void) => {
      db.collection(collection).deleteOne(query, (err: MongoError) => {
        if (err) { reject(err.message) }
        else { resolve(query._id) }
      })
    })
  }

  deleteMany(db: Db, collection: Collections, query: FilterQuery<any>): Promise<string> {
    return new Promise((resolve: (_id: string) => void, reject: (error: string) => void) => {
      db.collection(collection).deleteMany(query, (err: MongoError) => {
        if (err) { reject(err.message) }
        else { resolve(query._id) }
      })
    })
  }

  findOne(db: Db, collection: Collections, query: FilterQuery<any>, options?: any): Promise<any> {
    return new Promise((resolve: (result: any) => void, reject: (error: string) => void) => {
      db.collection(collection).findOne(query, options, (err: MongoError, result: any) => {
        if (err) { reject(err.message) }
        else { resolve(result) }
      })
    })
  }

  findMany(db: Db, collection: Collections, query: FilterQuery<any>, options?: FindOneOptions<any>): Promise<any[]> {
    return new Promise((resolve: (result: any[]) => void, reject: (error: string) => void) => {
      db.collection(collection).find(query, options).toArray((err: MongoError, result: any[]) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(result)
        }
      })
    })
  }

  updateOne(db: Db, collection: Collections, query: FilterQuery<any>, data: any): Promise<UpdateWriteOpResult> {
    return new Promise((resolve: (result: UpdateWriteOpResult) => void, reject: (error: string) => void) => {
      db.collection(collection).updateOne(query, data, (err: MongoError, result: UpdateWriteOpResult) => {
        if (err) { reject(err.message) }
        else { resolve(result) }
      })
    })
  }

  updateMany(db: Db, collection: Collections, query: FilterQuery<any>, data: any[]): Promise<UpdateWriteOpResult> {
    return new Promise((resolve: (result: UpdateWriteOpResult) => void, reject: (error: string) => void) => {
      db.collection(collection).updateMany(query, data, (err: MongoError, result: UpdateWriteOpResult) => {
        if (err) {
          reject(err.message)
        }
        else {
          resolve(result)
        }
      })
    })
  }
}

export const dbQueries = new DbQueries()