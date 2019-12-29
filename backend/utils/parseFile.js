const fs = require('fs')
const path = require('path');

const parsePackageData = (fileName) => {
  return fs
    .readFileSync(path.resolve(__dirname, `../${fileName}`), 'utf8')
    .split('\n\n')
    .map(pack => {
      const name = parseName(pack)
      const description = parseDescription(pack)
      const dependencies = Array.from(new Set(parseDependencies(pack)))
      return {
        name,
        description,
        dependencies
      }
    })
}

const parseName = (pack) => {
  return pack.match(/(?<=Package: ).*/)[0]
}

const parseDependencies = (pack) => {
  const dependencies = pack.match(/(?<=^Depends: ).*/m)
  if (!dependencies) {
    return []
  }
  return dependencies[0]
    .split(',')
    .map(depend => {
      if (depend.includes('|')) {
        return depend.split('|')
          .map(e => e.replace(/ \(.*\)/, '').trim())
          .join(' | ')
      }
      return depend.replace(/ \(.*\)/, '').trim()
    })
}

const parseDescription = (pack) => {
  const splits = pack.split(': ')
  if (splits[splits.length - 2].includes('Description')) {
    return splits[splits.length - 1]
  } else {
    const regEx = /(?<=Description: )(\d|\D)*?(?=^[A-Z](\d|\D)*:)/gm
    return pack.match(regEx)[0]
  }

}

module.exports = {
  parsePackageData,
  parseDependencies,
  parseDescription,
  parseName
}