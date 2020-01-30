import React from 'react'
import PackageLink from '../presentationals/PackageLink'
import Dependencies from '../Dependencies'

const Package = ({
  pack: { name, dependencies, description, dependants },
  allPackages
}) => {
  const newDescription = description => description.replace(/^ \./gm, ' ')

  return (
    <div className='SinglePackage'>
      <h1>{name}</h1>

      <h2>Description</h2>
      {<pre>{newDescription(description)}</pre>}

      <h2>Dependencies</h2>
      <div className='Grid'>
        <Dependencies dependencies={dependencies} allPackages={allPackages} />
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
