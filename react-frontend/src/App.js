import React from 'react';
import { useState, useEffect } from 'react'
import SinglePackage from './components/SinglePackage'
import './App.css'
const axios = require('axios')

const App = () => {
  const [packages, setPackages] = useState([])
  const [chosenPackage, setChosenPackage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const packages = await axios.get('/api/')
      setPackages(packages.data)
    }
    fetchData()
  }, [])

  const handleChange = async (name) => {
    try {
      const id = packages.find(e => e.name === name).id
      const res = await axios.get(`api/${id}`)
      setChosenPackage(res.data)
    } catch (error) {
      setMessage(`No package ${name} found`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

  }

  return (
    <div >
      <button className='Button' onClick={() => setChosenPackage(null)}>Back to index</button>
      {message && <div className='Message'>{message}</div>}

      {chosenPackage === null ?
        <div className='PackageList'>
          {packages.sort((e1, e2) => e1.name < e2.name ? -1 : 1)
            .map(pack => (
              <div className='PackageEntry'
                key={pack.id}
                onClick={() => handleChange(pack.name)} >
                <span>{pack.name}</span>
              </div>
            ))}
        </div>
        :
        <div>
          <SinglePackage
            packages={packages}
            setChosenPackage={handleChange}
            chosenPackage={chosenPackage} />
        </div>}
    </div >
  );
}

export default App;
