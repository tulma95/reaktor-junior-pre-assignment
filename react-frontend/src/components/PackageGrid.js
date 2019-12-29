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
        .map(e => (
          <Link className='GridItem' key={e.name} to={`${e.name}`}>
            <div>{e.name}</div>
          </Link>
        ))}
    </div>
  )
}

export default PackageGrid