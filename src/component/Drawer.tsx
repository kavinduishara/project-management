"use client"

import React,{useState} from 'react'
import { BiArrowFromRight } from 'react-icons/bi'

function Drawer() {
    const [drawer,setDrawer]=useState(false);
    const [contains,setContains]=useState("");
  return (
    <div className={`absolute h-screen ${drawer?"w-110":"w-10"} z-50 flex right-0 top-0 gap-3 justify-between items-center tansition-all duration-300 ease-in-out overflow-hidden`}>
        <button className="h-10 rounded-full shadow-2xl  top-1/2 z-max text-center border-2 border-yellow-300 bg-amber-50 flex items-center justify-center text-amber-300"
        onClick={()=>setDrawer(!drawer)}
        >
            {
                drawer?<BiArrowFromRight className='rotate-180'/>:<BiArrowFromRight />
            }
        </button>
        <div className={`h-screen ${drawer?"w-100":"w-0"} z-max bg-white border-l-2 border-gray-200 tansition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-1 p-4`}>
            <div className={`${drawer?"visble":"hidden"}`}>
                <h1 className='text-center text-4xl font-bold border-b-2'>Asistant</h1>
                <div className='mt-10 overflow-y-scroll h-14/20'>
                    {
                        contains?<h1 className='text-center text-4xl font-bold text-gray-400'>ask any thing</h1>:<h1 className='text-center text-4xl font-bold text-gray-400'>No conversation</h1>
                    } 
                </div>
                <div className='mt-4 bottom-0 flex gap-2 justify-between w-fullshadow-md  sticky'>
                    <input type="text" placeholder='ask any thing...' className='w-10/12 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400'/>
                    <button className='w-auto bg-orange-500 text-white font-semibold rounded-md p-2  hover:bg-orange-600'>Send</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Drawer