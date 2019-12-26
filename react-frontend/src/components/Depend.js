import React from 'react'
import './Depend.css'

const Depend = ({ name, handleClick, packages }) => {
  const alternates = () => {
    const splits = name.split('|')
      .map(e => e.trim())

    const pack = packages.find(pack => {
      return splits.includes(pack.name)
    })
    if (pack) {
      console.log(splits.filter(e => e !== pack.name));
      return <li className='Depend' onClick={() => handleClick(pack.name)} key={pack.name}>{pack.name}</li>
    } else {
      console.log(splits);
      return <div></div>
    }
  }


  if (name.includes('|')) {
    return alternates()
  } else {
    return <li className='Depend' onClick={() => handleClick(name)} key={name}>{name}</li>
  }
}
export default Depend