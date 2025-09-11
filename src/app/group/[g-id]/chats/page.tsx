import React from 'react'

function Chats() {
  return (
    <div className="p-5 m-3 bg-white h-full">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      {/* Meeting content goes here */}
      <div className='w-full h-full flex-col p-3'>
        <div className='border-2 border-amber-300 overflow-y-auto h-90 p-3'>
          <div className='border-2 border-amber-300 p-3'>

          </div>
          
        </div>
        <div className='border-2 border-amber-300 bottom-0 h-10 p-3'></div>
      </div>
    </div>
  )
}

export default Chats