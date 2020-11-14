const SimpleSchema = require('simpl-schema')
module.exports = {
  pull: new SimpleSchema({
    date: {
      type: String,
      min: 1,
      max: 100,
      optional: true
    },
  }),
  _id: new SimpleSchema({
    _id: {
      type: String,
      min: 9,
      max: 9
    },
  }),
  languageList: new SimpleSchema({
    languageList: ["fr", "en", "ar"],
  }),
  category: new SimpleSchema({
    title: {
      type: String,
      min: 1,
      max: 100,
    },
    columnCount: {
      type: Number,
      min: 1,
      max: 5
    },
    isPublic: Boolean,
    languageList: ["fr", "en", "ar"],
    _id: {
      type: String,
      min: 9,
      max: 9
    },
  }),
  vocabularyGroup: new SimpleSchema({
    image: {
      type: String,
      min: 1,
      max: 10000,
      optional: true
    },
    categoryId: {
      type: String,
      min: 9,
      max: 9
    },
    _id: {
      type: String,
      min: 9,
      max: 9
    },
  }),
  vocabularyItem: new SimpleSchema({
    title: {
      type: String,
      min: 1,
      max: 100,
    },
    audio: {
      type: String,
      min: 0,
      max: 500000,
      optional: true
    },
    _id: {
      type: String,
      min: 9,
      max: 9
    },
    categoryId: {
      type: String,
      min: 9,
      max: 9
    },
    groupId: {
      type: String,
      min: 9,
      max: 9
    },
  }),
}