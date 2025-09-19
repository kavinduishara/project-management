import React from 'react'
import { findGroupById } from '../../lib/groupCrud'

type Props = {
  group: {id: string, groupName: string} ,
}

async function ProjectName({ group }: Props) {
  const groupName = group.groupName ;

  return (
    <div className="fixed z-50 -mt-20 left-1/2 -translate-x-1/2">
      {group ? (
        <div className="px-6 py-2   text-black font-semibold text-lg">
          {groupName.toUpperCase()}
        </div>
      ) : (
        <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 text-sm shadow">
          Loading...
        </div>
      )}
    </div>
  )
}

export default ProjectName
