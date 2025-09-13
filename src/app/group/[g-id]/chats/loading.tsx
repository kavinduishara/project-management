import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
    </div>
  )
}

export default Loading