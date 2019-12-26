const packages = require('./utils/parseFile')
const express = require('express')
const cors = require('cors')
const app = express()
const { PORT } = require('./utils/config')

app.use(express.static(path.resolve(__dirname, '../react-frontend/build')));

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json(packages)
})

app.get('/:id', (req, res) => {
  const id = req.params.id
  try {
    const name = packages[id].name
    const dependants = packages
      .filter(package => package.dependencies.includes(name))
      .map(package => package.name)

    const responsePackage = {
      ...packages[id],
      dependants: Array.from(new Set(dependants))
    }
    res.status(200).json(responsePackage)
  } catch (error) {
    res.status(404).send('No package found with given id')
  }
})

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
})