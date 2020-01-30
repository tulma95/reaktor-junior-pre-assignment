const getAll = async () => {
  const res = await fetch('/api', {
    headers: {
      accepts: 'application/json'
    }
  })

  const data = await res.json()
  return data
}

const getPackage = async name => {
  const res = await fetch(`/api/${name}`, {
    headers: {
      accepts: 'application/json'
    }
  })
  const data = await res.json()
  if (data.error) throw data.error
  return data
}

export default { getAll, getPackage }
