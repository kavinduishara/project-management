import React from 'react'
import TaskForm from './TaskForm';
import { getTaskById } from '../../../../../../lib/taskCrud';

import {  getTasksInGroup } from '../../../../../../lib/taskCrud';
import { findGroupById } from '../../../../../../lib/groupCrud';

type Props = {
  params: Promise<{ "id": string,'g-id':string }>;
};

async function page({params}:Props) {
  const resolvedParams = await params;
  const id = resolvedParams['id'];
  

  const groupId = resolvedParams['g-id'];

  const tasksList= await getTasksInGroup(groupId);
  const group= (await findGroupById(groupId))[0];
  const members= group?.members || [];
  const tasks: {_id:string,taskName:string}[] = tasksList.map((task:{_id:string,taskName:string})=>({_id:task._id,taskName:task.taskName}));
  const task= await getTaskById(id)
  

  return (
    <div>
      <TaskForm tasksList={tasks} members={members} groupId={groupId} task={task[0]} />
      
    </div>
  )
}

export default page