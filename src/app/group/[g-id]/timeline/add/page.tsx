import {  getTasksInGroup } from '../../../../../../lib/taskCrud';
import { findGroupById } from '../../../../../../lib/groupCrud';
import TaskForm from './TaskForm';

type Props = {
  params: Promise<{ "g-id": string }>;
};


async function page({  params }: Props) {
  const resolvedParams = await params;
  const groupId = resolvedParams['g-id'];

  const tasksList= await getTasksInGroup(groupId);
  const group= (await findGroupById(groupId))[0];
  const members= group?.members || [];
  const tasks: {_id:string,taskName:string}[] = tasksList.map((task:{_id:string,taskName:string})=>({_id:task._id,taskName:task.taskName}));


  return (
    <div>
        <TaskForm tasksList={tasks} members={members} groupId={groupId}/>
    </div>
  )
}

export default page