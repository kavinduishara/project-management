import React from 'react'
import { findGroupById } from '../../lib/groupCrud'

type Props = {
  id: string,
}

async function ProjectName({ id }: Props) {
  const groups = await findGroupById(id);
  const group = groups.length > 0 ? groups[0].groupName : "Unknown Group";

  return (
    <div className="absolute z-50 -mt-20 left-1/2 -translate-x-1/2">
      {group ? (
        <div className="px-6 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold shadow-lg text-lg">
          {group}
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
