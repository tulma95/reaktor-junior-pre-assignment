import React, { useState, useEffect } from 'react';
import {
  Link,
  useParams
} from "react-router-dom";

const SinglePackage = ({ packages, setMessage }) => {
  const [pack, setPack] = useState()
  const [loading, setLoading] = useState(true)
  const { name } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/${name}`, {
          headers: {
            "accepts": "application/json"
          }
        })
        const data = await res.json()
        setPack(data)
        setLoading(false)
        setMessage(null)
      } catch (error) {
        setMessage(`No data for package ${name} found!!`)
      }
    }
    fetchData()
  }, [name, setMessage])

  const parseAlternates = (dependency) => {
    const dependencies = dependency.split('|')
      .map(e => e.trim())

    const found = packages.find(pack => dependencies.includes(pack.name))

    if (!found) return <div key={dependency}>{dependency}</div>

    return (
      <div className='GridItem'>
        <Link to={`${found.name}`}>
          {found.name}
        </Link>
        {dependencies
          .filter(dependency => dependency !== found.name)
          .map((dependency, i) => <span key={i}> | {dependency}</span>)}
      </div>
    )
  }


  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className='SinglePackage'>
        <h1>{pack.name}</h1>

        <h2>Description</h2>
        <div>{pack.description
          .replace(/^ \./gm, ' ')
          .split('\n')
          .map((line, i) => <pre key={i}>{line}</pre>)}
        </div>

        <h2>Dependencies</h2>
        <div className='Grid'>
          {pack.dependencies
            .map((dependency, i) => {
              if (dependency.includes('|')) {
                return parseAlternates(dependency)
              }
              return (
                <Link className='GridItem' key={i} to={`${dependency}`}>
                  <div>{dependency}</div>
                </Link>
              )
            })}
        </div>

        <h2>Dependants</h2>
        <div className='Grid'>
          {pack.dependants.map((dependant, i) => (
            <Link className='GridItem' key={i} to={`${dependant}`}>
              <div >{dependant}</div>
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default SinglePackage