import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import React from 'react'

function Navigation() {
  return (
    <div className='sticky top-0 z-50 bg-white shadow-md border-b-2 border-amber-400'>
    <nav className='flex items-center justify-between  p-4 gap-6'>
        <div className='text-xl font-bold'><span className='text-orange-500'>Hive</span>Mind</div>
        <div className='flex items-center space-x-4'>
        <SignedIn>
            <a href="/" className='text-gray-700 hover:text-blue-500'>Home</a>
            <a href="/groups" className='text-gray-700 hover:text-blue-500'>Projects</a>
            <a href="/create" className='text-gray-700 hover:text-blue-500'>New project</a>
            <UserButton/>
        </SignedIn>
        <SignedOut>
            <SignInButton />
            <div className="group rounded-lg bg-orange-500 p-2 text-white cursor-pointer hover:bg-orange-600">
              <SignUpButton />
            </div>


            
        </SignedOut>
        </div>
    </nav>
    </div>

  )
}

export default Navigation