// tslint:disable-next-line:no-var-requires
const SimpleSchema = require('simpl-schema')

export const schemas = {
  pull: new SimpleSchema({
    date: {
      type: String,
      min: 1,
      max: 100,
    },
  }),

  _id: new SimpleSchema({
    _id: {
      type: String,
      min: 9,
      max: 9
    },
  }),

  category: new SimpleSchema({
    isPublic: Boolean,
    _id: {
      type: String,
      min: 9,
      max: 9
    },
  }),
  categoryTitle: new SimpleSchema({
    title: {
      type: String,
      min: 1,
      max: 100,
    }
  }),
  vocabulary: new SimpleSchema({
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

  translation: new SimpleSchema({
    title: {
      type: String,
      min: 0,
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
  }),
}