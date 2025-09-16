import React from 'react'
import { getTasksInGroup,getAllTasks } from '../../../../../../lib/taskCrud';
import { TaskType } from '../../../../../../lib/Tasks';
import Link from "next/link";
import { FiEdit } from "react-icons/fi";

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
    <div className="w-full m-5 p-5 bg-white rounded-2xl shadow-md">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100 text-gray-700 text-sm">
        <th className="border-b p-3 text-left">Task Name</th>
        <th className="border-b p-3 text-left">Duration</th>
        <th className="border-b p-3 text-left">Prerequisites</th>
        <th className="border-b p-3 text-left">Status</th>
        <th className="border-b p-3 text-left">Assigned To</th>
        <th className="border-b p-3 text-left">Progress</th>
        <th className="border-b p-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasksList.map((task: TasksType) => (
        <tr
          key={task._id}
          className="odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition"
        >
          <td className="p-3">{task.taskName}</td>
          <td className="p-3">{task.duration}</td>
          <td className="p-3">
            {tasksList
              .filter((t:TasksType) => task?.preRequsitse?.includes(t._id))
              .map((t:TasksType) => (
                <span key={t._id} className="mr-2">{t.taskName}</span>
            ))}
          </td>
          <td className="p-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium
                ${task.status === "Done" ? "bg-green-100 text-green-700" : ""}
                ${task.status === "In Progress" ? "bg-yellow-100 text-yellow-700" : ""}
                ${task.status === "To Do" ? "bg-red-100 text-red-700" : ""}`}
            >
              {task.status}
            </span>
          </td>
          <td className="p-3">{task.assignedTo}</td>
          <td className="p-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-500">{task.progress}%</span>
          </td>
          <td className="p-3">
            <div className="flex gap-2">
              <Link
                href={`${baseurl}/${task._id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                <FiEdit className="w-4 h-4" />
              </Link>
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