import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setcolor] = useState("")

  return (
    <>
      <div className='w-full h-screen duration-200' style={{backgroundColor: color}}>
        <div className='fixed bottom-12 flex flex-wrap justify-center px-2 inset-x-2'>
          <div className='bg-white rounded-lg px-3 py-4 flex flex-wrap justify-center gap-3'>
            <button onClick={() => {setcolor("red")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "red"}}>Red</button>
            <button onClick={() => {setcolor("green")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "green"}}>green</button>
            <button onClick={() => {setcolor("purple")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "purple"}}>purple</button>
            <button onClick={() => {setcolor("indigo")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "indigo"}}>indigo</button>
            <button onClick={() => {setcolor("blue")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "blue"}}>blue</button>
            <button onClick={() => {setcolor("orange")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "orange"}}>orange</button>
            <button onClick={() => {setcolor("violet")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "violet"}}>violet</button>
            <button onClick={() => {setcolor("gray")}} className='outline-none px-4 py-1 rounded-lg text-white' style={{backgroundColor: "gray"}}>gray</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
