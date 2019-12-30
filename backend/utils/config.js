const path = require('path');
const fs = require('fs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let PATH
if (process.env.HEROKU === 1) {
  PATH = path.resolve(__dirname, `../statustest.txt`)
} else {
  path = fs.existsSync('/var/lib/dpkg/status') ?
    '/var/lib/dpkg/status' : path.resolve(__dirname, `../statustest.txt`)
}



let PORT = process.env.PORT

module.exports = {
  PORT,
  PATH
}