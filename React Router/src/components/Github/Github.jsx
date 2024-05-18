import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
  const data = useLoaderData()
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   fetch('https://api.github.com/users/ansarirayyan01')
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setData(data);
  //   })
  // }, [])
  
  return (
    <div className='bg-gray-500 p-4 my-4 text-white '>
      Github: {data.following}
      <img className='flex justify-center items-center' alt="" width={300}/>
    </div>
  )
}

export default Github


export const githubInfo = async () => {
  const response = await fetch("https://api.github.com/users/ansarirayyan01")
  return response.json()
}