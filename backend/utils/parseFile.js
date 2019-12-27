const fs = require('fs')
const path = require('path');


const PackagesData = fs.readFileSync(path.resolve(__dirname, '../statustest.txt'), 'utf8')
  .split('\n\n')

const parsePackageData = () => {
  let packages = []

  for (let i = 0; i < PackagesData.length; i++) {
    const id = i
    let name = ''
    let description = ''
    let dependencies = []
    let packageLines = PackagesData[i]
      .split('\n')
      .map(line => line.split(': '))


    for (let packageLine = 0; packageLine < packageLines.length; packageLine++) {

      const command = packageLines[packageLine][0]

      switch (command) {
        case 'Package':
          name = packageLines[packageLine][1].trim()
          break;
        case 'Description':
          description = parseDescription(packageLines, packageLine)
          break;
        case 'Depends':
          dependencies = parseDependencies(packageLines, packageLine)
        default:
          break;
      }
    }
    const newPackage = {
      id,
      name,
      description,
      dependencies
    }
    packages[id] = newPackage
  }
  return packages
}

const parseDependencies = (packageLines, row) => {
  const dependencies = packageLines[row][1].split(',')
    .map(dependency => {
      const dependancyWithoutVersion = dependency.replace(/\(.*\)/, " ")
      return dependancyWithoutVersion.trim()
    })
  return Array.from(new Set(dependencies))
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