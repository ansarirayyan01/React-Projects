import React from 'react'

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4  mb-4'>
    <div className='text-black'>
    {children}

    </div>
    </div>;
  
}

export default Container