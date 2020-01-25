import React from 'react';
import {
  Link
} from "react-router-dom";

const PackageGrid = ({ packages, setMessage }) => {
  setMessage(null)

  const sortByName = (pack1, pack2) => {
    return pack1.name > pack2.name ? 1 : -1
  }

  const pack = pack => {
    return (
      <Link className='GridItem' key={pack.name} to={`${pack.name}`}>
        <div>{pack.name}</div>
      </Link>
    )
  }

  return (
    <div className='IndexGrid'>
      {packages
        .sort(sortByName)
        .map(pack)}
    </div>
  )
}

export default PackageGrid