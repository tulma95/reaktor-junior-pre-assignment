import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Package from './presentationals/Package'

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

  return <Package pack={pack} allPackages={packages} />
}

export default SinglePackageView
