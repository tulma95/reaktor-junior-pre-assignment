import React from 'react'
import PackageLink from './presentationals/PackageLink'

const Dependencies = ({ dependencies, allPackages }) => {
  const parseAlternates = (dependency, allPackages) => {
    const alternateDeps = dependency.split(' | ')
    const found = allPackages.find(pack => alternateDeps.includes(pack.name))

    if (!found) {
      return (
        <div className='GridItem' key={dependency}>
          {dependency}
        </div>
      )
    }

    const restDependencies = alternateDeps.filter(
      dependency => dependency !== found.name
    )
    return (
      <PackageLink key={found.name} name={found.name} rest={restDependencies} />
    )
  }

  const createDependencyItem = allPackages => dependency => {
    return dependency.includes('|') ? (
      parseAlternates(dependency, allPackages)
    ) : (
      <PackageLink key={dependency} name={dependency} />
    )
  }
  const withPackages = createDependencyItem(allPackages)

  return dependencies.map(withPackages)
}
export default Dependencies
