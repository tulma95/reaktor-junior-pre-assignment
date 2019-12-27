import React from 'react'
import Depend from '../components/Depend'
import './SinglePackage.css'




const SinglePackage = ({ chosenPackage, setChosenPackage, packages }) => {

  const handleClick = (name) => {
    setChosenPackage(name)
  }

  return (
    <div className='SinglePackage'>
      <h1>{chosenPackage.name}</h1>

      <div className='Description'>
        {chosenPackage.description.split('\n').map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </div>

      <h2>Dependencies</h2>

      <div className='Depends'>
        {chosenPackage.dependencies.map(name => (
          <Depend key={name}
            handleClick={handleClick}
            name={name}
            packages={packages} />
        ))}
      </div>

      <h2>Dependants</h2>
      <ul className='Dependants'>
        {chosenPackage.dependants.map(name => (
          <Depend key={name}
            handleClick={handleClick}
            name={name}
            packages={packages} />
        ))}
      </ul>


    </div>

  )
}

export default SinglePackage