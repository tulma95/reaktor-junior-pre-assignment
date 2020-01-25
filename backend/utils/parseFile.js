const fs = require('fs')

const parsePackageData = (fileName) => {
  return fs
    .readFileSync(fileName, 'utf8')
    .split('\n\n')
    .filter(removeEmptyLines)
    .map(createPackageObject)
}

const createPackageObject = pack => {
  const name = parseName(pack)
  const description = parseDescription(pack)
  const dependencies = [...new Set(parseDependencies(pack))]
  return {
    name,
    description,
    dependencies
  }
}

const removeEmptyLines = line => line.length !== 0

const parseName = pack => pack.match(/(?<=^Package: ).*/m)[0]

const parseDependencies = pack => {
  const dependencies = pack.match(/(?<=^Depends: ).*/m)
  if (!dependencies) {
    return []
  }
  return dependencies[0]
    .split(',')
    .map(removeVersionNumber)
}

const removeVersionNumber = depend => {
  if (depend.includes('|')) {
    return depend.split('|')
      .map(removeVersionNumber)
      .join(' | ')
  }
  return depend.replace(/ \(.*\)/, '').trim()
}


const parseDescription = pack => {
  const splits = pack.split(': ')
  if (descriptionIsLastAttribute(splits)) {
    return splits[splits.length - 1]
  } else {
    const regEx = /(?<=Description: )(\d|\D)*?(?=^[A-Z](\d|\D)*:)/gm
    return pack.match(regEx)[0]
  }
}

const descriptionIsLastAttribute = splits => {
  return splits[splits.length - 2].includes('Description')
}

module.exports = {
  parsePackageData,
  parseDependencies,
  parseDescription,
  parseName
}