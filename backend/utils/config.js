const path = require('path');
const fs = require('fs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let PATH
if (process.env.HEROKU === 'yes') {
  path.resolve(__dirname, `../statusMock.txt`)
} else {
  PATH = fs.existsSync('/var/lib/dpkg/status') ?
    '/var/lib/dpkg/status' : path.resolve(__dirname, `../statusMock.txt`)
}



let PORT = process.env.PORT

module.exports = {
  PORT,
  PATH
}