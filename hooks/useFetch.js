import React, { useEffect, useState } from 'react'
import axios from 'axios';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function() {
        setLoading(true)

        async function getData() {
            await axios.get(url)
            .then(res => {
                res && res.data && setData(res.data)
            })
            .catch(err => {
                setError(err)
            })
            .finally(
                setLoading(false)
            )
        }

        getData()
        
    }, [url])

    return { data, loading, error }
}

export default useFetch