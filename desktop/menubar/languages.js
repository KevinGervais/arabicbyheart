const en = require('./en.js')
const fr = require('./fr.js')
const languageMap = {
  en,
  fr
}
function getLanguageDict(app) {
  return en
}

module.exports = getLanguageDict