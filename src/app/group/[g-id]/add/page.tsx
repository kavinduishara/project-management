import React from 'react';
import AddMembers from './AddMembers';

type Props = {
  params: Promise<{ "g-id": string }>;
};

async function Page({ params }: Props) {
    const resolvedParams = await params;
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <AddMembers params={resolvedParams} />
    </div>
  );
}

export default Page;
