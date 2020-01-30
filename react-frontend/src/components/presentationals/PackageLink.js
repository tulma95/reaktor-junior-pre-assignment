import React from 'react'
import { Link } from 'react-router-dom'

const PackageLink = ({ name, rest }) => {
  const restString = rest && ` | ${rest.join(' | ')}`
  return (
    <div className='GridItem'>
      <Link to={`${name}`}>{name}</Link>
      {restString}
    </div>
  )
}

export default PackageLink
