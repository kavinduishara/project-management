"use client"

import React from 'react'
import { BiArrowFromRight } from 'react-icons/bi'

function Button() {
  return (
    <button className="h-10 w-10 rounded-full shadow-2xl animate-bounce absolute right-0 top-1/2 z-max text-center border-2 border-yellow-300 bg-amber-50 flex items-center justify-center text-amber-300">
        <h1><BiArrowFromRight/></h1>
    </button>
  )
}

export default Button