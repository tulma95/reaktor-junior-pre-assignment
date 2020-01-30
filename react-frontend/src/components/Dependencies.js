import React from 'react'
import PackageLink from './presentationals/PackageLink'

const Dependencies = ({ dependencies, allPackages, parseAlternates }) =>
  dependencies.map(dependency => {
    return dependency.includes('|') ? (
      parseAlternates(dependency, allPackages)
    ) : (
      <PackageLink key={dependency} name={dependency} />
    )
  })

export default Dependencies
