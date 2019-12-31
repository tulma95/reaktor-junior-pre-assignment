import React from 'react';
import {
  Link
} from "react-router-dom";

const PackageGrid = ({ packages, setMessage }) => {
  setMessage(null)
  return (
    <div className='IndexGrid'>
      {packages
        .sort((e1, e2) => e1.name > e2.name ? 1 : -1)
        .map(pack => (
          <Link className='GridItem' key={pack.name} to={`${pack.name}`}>
            <div>{pack.name}</div>
          </Link>
        ))}
    </div>
  )
}

export default PackageGrid