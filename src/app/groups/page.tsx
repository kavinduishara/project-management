import React from 'react'
import { getMyGroups } from '../../../lib/groupCrud'

async function page() {
    const groups = await getMyGroups();
  return (
    <div className='flex flex-col justify-center text-center'>
        <h1 className='p-4 m-4 font-bold text-4xl'>All projects</h1>
        <div className='mt-10 flex flex-wrap justify-center'>
            {groups.map((group:{groupName:string,members:string[]}, index:Number) => (
              <div key={`group-${index}`} className='flex flex-col bg-blue-600 w-30 h-20 rounded-lg align-center'>
                <h2 className='text-white'>{group.groupName}</h2>
              </div>
            ))}
        </div>
        {groups.length === 0 && <p>No groups found.</p>}
    </div>
  )
}

export default page