import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) return
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((response) => {
        const data = response.data
        setCountry({
          found: true,
          data: {
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png
          }
        })
      })
      .catch(() => {
        setCountry({
          found: false
        })
      })
  }, [name])

  return country
}