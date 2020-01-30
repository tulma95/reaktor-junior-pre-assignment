import React from 'react'
import PackageLink from './presentationals/PackageLink'

const PackageGrid = ({ packages, setMessage }) => {
  setMessage(null)

  const sortByName = (pack1, pack2) => {
    return pack1.name.localeCompare(pack2.name)
  }

  const toListItem = pack => <PackageLink key={pack.name} name={pack.name} />

  return (
    <div className='IndexGrid'>{packages.sort(sortByName).map(toListItem)}</div>
  )
}

export default PackageGrid
