import React, { useEffect, useState } from 'react'
import axios from 'axios';

function useFetch(url) {
    // const url = 'www.themealdb.com/api/json/v1/1/categories.php'

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function() {
    setLoading(true)

    async function getData() {
      try{
        const response = await axios.get(url)

        if (response && response?.data) {
          setData(response?.data)
        }
        setLoading(false)
      } catch(err) {
        setError(err.message)
      }
    }

    getData()
    
}, [])

    return { data, loading, error }
}

export default useFetch