import React from 'react'
import { getTasksInGroup,getAllTasks } from '../../../../../../lib/taskCrud';
import { TaskType } from '../../../../../../lib/Tasks';
import Link from "next/link";

type Props = {
  params: Promise<{ "g-id": string }>;
};
type TasksType = {
  _id: string;
} & TaskType;

async function page({params}:Props) {
    const resolvedParams = await params;
    const groupId = resolvedParams['g-id'];
    const tasksList= await getTasksInGroup(groupId);
    const baseurl = `/group/${resolvedParams['g-id']}/timeline/`; 
  return (
    <>
    <div>
      <table className='border-collapse border border-gray-400'>
        <thead>
          <tr>
            <th className="border border-gray-300 ...">taskName</th>
            <th className="border border-gray-300 ...">duration</th>
            <th className="border border-gray-300 ...">Prerequsits</th>
            <th className="border border-gray-300 ...">status</th>
            <th className="border border-gray-300 ...">assignedTo</th>
            <th className="border border-gray-300 ...">progress</th>
            <th className="border border-gray-300 ...">actions</th>
          </tr>
        </thead>
        <tbody>

            {tasksList.map((task:TasksType)=>(
              <tr key={task._id}>
                <td>{task.taskName}</td>
                <td>{task.duration}</td>
                <td>{task.preRequsitse}</td>
                <td>{task.status}</td>
                <td>{task.assignedTo}</td>
                <td>{task.progress}</td>
                <td>
                  <div className='flex gap-2 '>
                    <Link href={baseurl+"/"+task._id}> edit</Link>
                  </div>
                </td>
              </tr>

            ))}

        </tbody>
      </table>
    </div>
    </>
    
  )
}

export default page