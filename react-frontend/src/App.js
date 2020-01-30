import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import SinglePackageView from './components/SinglePackageView'
import PackageGrid from './components/PackageGrid'

const App = () => {
  const [packages, setPackages] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api', {
        headers: {
          accepts: 'application/json'
        }
      })
      const data = await res.json()
      setPackages(data)
    }
    fetchData()
  }, [])

  return (
    <div className='App'>
      <div className='Header'>
        <Link to='/'>
          <button>Back to index</button>
        </Link>
        <h2>Package viewer</h2>
        <div style={{ fontSize: '20px', color: 'red' }}>{message}</div>
      </div>

      <Route exact path='/'>
        <PackageGrid packages={packages} setMessage={setMessage} />
      </Route>
      <Route path='/:name'>
        <SinglePackageView packages={packages} setMessage={setMessage} />
      </Route>
    </div>
  )
}

export default App
