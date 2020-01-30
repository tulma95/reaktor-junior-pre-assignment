import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const SinglePackage = ({ packages, setMessage }) => {
  const [pack, setPack] = useState()
  const [loading, setLoading] = useState(true)
  const { name } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/${name}`, {
          headers: {
            accepts: 'application/json'
          }
        })
        const data = await res.json()
        setPack(data)
        setLoading(false)
        setMessage(null)
      } catch (error) {
        setMessage(`No data for package ${name} found!`)
      }
    }
    fetchData()
  }, [name, setMessage])

  if (loading) return <div>Loading...</div>

  const parseAlternates = dependency => {
    const dependencies = dependency.split('|').map(e => e.trim())

    const found = packages.find(pack => dependencies.includes(pack.name))

    if (!found)
      return (
        <div className='GridItem' key={dependency}>
          {dependency}
        </div>
      )

    return (
      <div key={dependency} className='GridItem'>
        <Link to={`${found.name}`}>{found.name}</Link>
        {dependencies
          .filter(dependency => dependency !== found.name)
          .map((dependency, i) => (
            <span key={i}> | {dependency}</span>
          ))}
      </div>
    )
  }

  const description = description => description.replace(/^ \./gm, ' ')

  return (
    <div className='SinglePackage'>
      <h1>{pack.name}</h1>

      <h2>Description</h2>
      <div>{<pre>{description(pack.description)}</pre>}</div>

      <h2>Dependencies</h2>
      <div className='Grid'>
        <Dependencies
          dependencies={pack.dependencies}
          parseAlternates={parseAlternates}
        />
      </div>

      <h2>Dependants</h2>
      <div className='Grid'>
        {pack.dependants.map((dependant, i) => (
          <Link className='GridItem' key={i} to={`${dependant}`}>
            <div>{dependant}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const Dependencies = ({ dependencies, parseAlternates }) => {
  console.log(dependencies)
  return dependencies.map((dependency, i) => {
    if (dependency.includes('|')) {
      return parseAlternates(dependency)
    }
    return (
      <Link className='GridItem' key={i} to={`${dependency}`}>
        <div>{dependency}</div>
      </Link>
    )
  })
}

export default SinglePackage
