const {
  parsePackageData
} = require('./utils/parseFile')
const express = require('express')
const cors = require('cors')
const path = require('path');
const app = express()
const {
  PORT,
  PATH
} = require('./utils/config')

const packages = parsePackageData(PATH)

app.use(express.static(path.resolve(__dirname, '../react-frontend/build')));

app.use(cors())

app.get('/api', (req, res) => {
  res.status(200).json(packages)
})

app.get('/api/:name', (req, res) => {
  const name = req.params.name
  const package = packages.find(e => e.name === name)

  if (package) {
    const dependants = packages
      .filter(ifDependenciesInclude(name))
      .map(getName)

    const responsePackage = {
      ...package,
      dependants: [...new Set(dependants)]
    }
    res.status(200).json(responsePackage)
  } else {
    res.status(404).send('No package found with given id')
  }
})

const ifDependenciesInclude = name => package => {
  return package.dependencies.includes(name)
}

const getName = package => package.name

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../react-frontend/build', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
})