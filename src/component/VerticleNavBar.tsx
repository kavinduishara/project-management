import { User } from '@clerk/nextjs/server'
import React from 'react'

function VerticleNavBar() {
  return (
    <div className='absolute left-0 z-50 w-0.5 bg-white shadow-md border-b-2 border-amber-400'>
    <nav className='flex flex-col items-center justify-between  p-4 gap-6'>
        <div className='text-xl font-bold flex flex-col items-center'>
            <div>
                <h1>home</h1>
                <h1>home</h1>
                <h1>home</h1>
                <h1>home</h1>
            </div>
        </div>
    </nav>
    </div>

  )
}

export default VerticleNavBar