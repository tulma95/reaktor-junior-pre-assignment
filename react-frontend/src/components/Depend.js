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
      return (
        <div className='Depend' onClick={() => handleClick(pack.name)} key={pack.name}>
          {pack.name}
        </div>
      )
    } else {
      console.log(splits);
      return <div></div>
    }
  }


  if (name.includes('|')) {
    return alternates()
  } else {
    return <div className='Depend' onClick={() => handleClick(name)} key={name}>
      {name}
    </div>
  }
}
export default Depend