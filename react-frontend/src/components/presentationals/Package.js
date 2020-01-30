import React from 'react'
import PackageLink from '../presentationals/PackageLink'
import Dependencies from '../Dependencies'

const Package = ({
  pack: { name, dependencies, description, dependants },
  allPackages
}) => {
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

  const newDescription = description => description.replace(/^ \./gm, ' ')

  return (
    <div className='SinglePackage'>
      <h1>{name}</h1>

      <h2>Description</h2>
      {<pre>{newDescription(description)}</pre>}

      <h2>Dependencies</h2>
      <div className='Grid'>
        <Dependencies
          dependencies={dependencies}
          parseAlternates={parseAlternates}
          allPackages={allPackages}
        />
      </div>

      <h2>Dependants</h2>
      <div className='Grid'>
        {dependants.map(dependant => (
          <PackageLink key={dependant} name={dependant} />
        ))}
      </div>
    </div>
  )
}

export default Package
