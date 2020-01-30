const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PATH = path.resolve(__dirname, `../statusMock.txt`)
let PORT = process.env.PORT || 3003

module.exports = {
  PORT,
  PATH
}
