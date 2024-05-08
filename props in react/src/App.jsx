import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='bg-green-500 text-center text-white p-4 rounded-xl mb-3'>Tailwind CSS</h1>
      <Card username="rayyan" btntext = "Click me"/>
      <Card username="rafey" btntext = "Click me"/>
    </>
  )
}

export default App
