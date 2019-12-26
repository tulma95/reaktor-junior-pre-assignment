const fs = require('fs')
const path = require('path');


const data = fs.readFileSync(path.resolve(__dirname, '../statustest.txt'), 'utf8').split('\n\n')

const parsePackageData = () => {
  let packages = []

  for (let i = 0; i < data.length; i++) {
    const id = i
    let name = ''
    let description
    let dependencies = []
    let packageLines = data[i].split('\n').map(line => line.split(': '))


    for (let j = 0; j < packageLines.length; j++) {
      if (packageLines[j][0] === 'Package') {
        name = packageLines[j][1].trim()
      } else if (packageLines[j][0] === 'Description') {
        description = parseDescription(packageLines, j)
      } else if (packageLines[j][0] === 'Depends') {
        dependencies = packageLines[j][1].split(',')
          .map(dependency => {
            const moddedDependancy = dependency.replace(/\(.*\)/, " ")
            return moddedDependancy.trim()
          })
      }
    }
    const newPackage = {
      id,
      name,
      description,
      dependencies: Array.from(new Set(dependencies))
    }
    packages[id] = newPackage
  }
  return packages
}

const parseDescription = (packageLines, row) => {
  let description = packageLines[row][1].trim()

  let descRow = 1
  while (true) {
    if (!packageLines[row + descRow] || packageLines[row + descRow][0].charAt(0) !== ' ') {
      break
    }
    description = description.concat(`${packageLines[row + descRow]} \n`)
    descRow++
  }
  return description
}

module.exports = parsePackageData()