import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Package from './presentationals/Package'
import packageService from '../services/packageService'

const SinglePackageView = ({ packages, setMessage }) => {
  const [pack, setPack] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { name } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pack = await packageService.getPackage(name)
        setPack(pack)
        setLoading(false)
        setMessage(null)
      } catch (error) {
        setError(true)
        setMessage(`${error}`)
      }
    }
    fetchData()
  }, [name, setMessage])

  if (error) return <div>See header for more info</div>
  if (loading) return <div>Loading...</div>

  return <Package pack={pack} allPackages={packages} />
}

export default SinglePackageView
