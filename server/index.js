const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 8080

console.log('server is running')

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
app.use(express.static(path.join(__dirname, '../build')))
app.get('*/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
