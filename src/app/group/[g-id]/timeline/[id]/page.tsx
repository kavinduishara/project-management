import React from 'react'
import TaskForm from './TaskForm';

type Props = {
  params: Promise<{ "id": string }>;
};

async function page({params}:Props) {
  const resolvedParams = await params;
  const id = resolvedParams['id'];
  
  return (
    <div>
      {/* <TaskForm /> */}
    </div>
  )
}

export default page