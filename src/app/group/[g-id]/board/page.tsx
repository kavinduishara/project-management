import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import Page from './CanvasComponent';

type Props = {
  params: Promise<{ "g-id": string }>
}

async function page({ params }: Props) {
    const resolvedParams = await params;
    const user = await currentUser();
    const memberId = user?.username || "Unknown";

  return (
    <div>
        <div className="p-4 border-b bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Live White Board</h1>
        </div>
        <Page params={{ ...resolvedParams }} memberId={memberId} />
    </div>
  )
}

export default page