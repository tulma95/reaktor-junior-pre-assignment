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
        const res = await fetch(`http://localhost:3003/api/${name}`, {
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
  }, [name])



  if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div className='SinglePackage'>
        <h1>{pack.name}</h1>

        <h2>Description</h2>
        <div>{pack.description
          .split('\n')
          .map((line, i) => <div key={i}>{line}</div>)}
        </div>

        <h2>Dependencies</h2>
        <div className='Grid'>
          {pack.dependencies
            .map((dependency, i) => {
              if (dependency.includes('|')) {
                const splitted = dependency.split('|').map(e => e.trim())
                const found = packages.find(e => splitted.includes(e.name))
                if (!found) {
                  console.log(splitted);
                  return <div key={i}></div>
                }
                console.log(splitted.filter(e => e !== found.name));
                dependency = found.name
              }
              return (
                <Link className='GridItem' key={i} to={`${dependency}`}>
                  <div>{dependency}</div>
                </Link>)
            })}
        </div>

        <h2>Dependants</h2>
        <div className='Grid'>
          {pack.dependants.map((e, i) => (
            <Link className='GridItem' key={i} to={`${e}`}>
              <div >{e}</div>
            </Link>
          ))}
        </div>
      </div >
    )
  }
}

export default SinglePackage