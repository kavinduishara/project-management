import Link from 'next/link';
import React, { useRef,useState } from 'react'

function Timeline() {
  return (
    <div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">Chart</h1>
<Link
          href={"chart/../"}
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Switch to Chart View
        </Link>
    </div>
  )
}

export default Timeline