import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const SinglePackageView = ({ packages, setMessage }) => {
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

  const parseAlternates = (dependency, allPackages) => {
    const alternateDeps = dependency.split(' | ')
    const found = allPackages.find(pack => alternateDeps.includes(pack.name))

    if (!found) {
      return (
        <div className='GridItem' key={dependency}>
          {dependency}
        </div>
      )
    }

    const notFoundDependencies = alternateDeps
      .filter(dependency => dependency !== found.name)
      .join(' | ')

    return (
      <div key={dependency} className='GridItem'>
        <Link to={`${found.name}`}>{found.name}</Link> | {notFoundDependencies}
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
          allPackages={packages}
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

const Dependencies = ({ dependencies, allPackages, parseAlternates }) => {
  return dependencies.map((dependency, i) => {
    if (dependency.includes('|')) {
      return parseAlternates(dependency, allPackages)
    }
    return (
      <Link className='GridItem' key={i} to={`${dependency}`}>
        <div>{dependency}</div>
      </Link>
    )
  })
}

export default SinglePackageView
