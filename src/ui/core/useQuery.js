import { useEffect, useState } from 'react'
import client from './client'

export default function() {
  const [data, updateData] = useState([])

  useEffect(async query => {
    try {
      const myData = await client({ query })
      updateData(myData.data)
    } catch (err) {
      console.log('error: ', err)
    }
  }, [])

  return data
}
