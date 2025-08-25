import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import React from 'react'

function Navigation() {
  return (
    <div className='sticky top-0 z-50 bg-white shadow-md'>
    <nav className='flex items-center justify-between  p-4 gap-6'>
        <div className='text-xl font-bold'>Project Manager</div>
        <div className='flex items-center space-x-4'>
        <SignedIn>
            <a href="/" className='text-gray-700 hover:text-blue-500'>Home</a>
            <a href="/database" className='text-gray-700 hover:text-blue-500'>Database</a>
            <a href="/about" className='text-gray-700 hover:text-blue-500'>About</a>
            <UserButton/>
        </SignedIn>
        <SignedOut>
            <SignInButton mode="modal" />
            <SignUpButton />
        </SignedOut>
        </div>
    </nav>
    </div>

  )
}

export default Navigation