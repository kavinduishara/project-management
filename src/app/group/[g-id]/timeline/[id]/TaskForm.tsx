"use client"

import React, { useActionState,useEffect,useState } from 'react'
import { updateTask, FormState } from '@/actions/task';
import { TaskType } from '../../../../../../lib/Tasks';
import { redirect } from 'next/navigation';


type TasksType = {
  _id: string;
} & TaskType;

type Props = {
    
  tasksList: {_id:string,taskName:string}[],
  members:string[],
  groupId: string,
  task:TasksType
};

function TaskForm({tasksList,members,groupId,task}: Props) {

    const initialState: FormState = {
      error: undefined,
      success: undefined,
      newOne:undefined
    };
    const  [state,formAction,isPending]=useActionState(
      updateTask,
      initialState
    )


  return (
    <div className="max-w-lg mx-auto mt-8">
  <form
    className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md"
    action={formAction}
  >
    <h1 className="text-xl font-semibold text-gray-800">Add New Entry</h1>

    <input
      type="text"
      placeholder="Title"
      name="title"
      defaultValue={task.taskName}
      required
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <input type="hidden" name="groupId" value={groupId} />
    <input type="hidden" name="task" value={task._id} />

    <label className="text-sm text-gray-600 font-medium">Prerequisites</label>
    <select
      name="prerequest"
      multiple
      defaultValue={task.preRequsitse}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value={""}>
          -no prerequests-
        </option>
      {tasksList.map((task: { _id: string; taskName: string }) => (
        <option key={task._id} value={task._id}>
          {task.taskName}
        </option>
      ))}
    </select>

    <label className="text-sm text-gray-600 font-medium">Assigned To</label>
    <select
      name="members"
      required
      defaultValue={task.assignedTo[0]||""}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value={""}>
          -no members-
        </option>
      {members.map((member: string) => (
        <option key={member} value={member}>
          {member}
        </option>
      ))}
    </select>

    <input
      type="number"
      placeholder="Duration (hours)"
      name="duration"
      defaultValue={task.duration}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <label className="text-sm text-gray-600 font-medium">Status</label>
    <select
      defaultValue={task.status}
      name="status"
      required
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="To Do">To Do</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>

    <button
      type="submit"
      disabled={isPending}
      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
    >
      {isPending ? "Saving..." : "Save Entry"}
    </button>

    {state.error && (
      <p className="text-red-500 text-sm">Error: {state.error.message}</p>
    )}
    {state.success && redirect("../timeline")}
  </form>
</div>

  )
}

export default TaskForm