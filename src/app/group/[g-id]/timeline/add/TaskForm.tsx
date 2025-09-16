"use client"

import React, { useActionState,useEffect } from 'react'
import { createTask, FormState } from '@/actions/task';

type Props = {
    
  tasksList: {_id:string,taskName:string}[],
  members:string[],
  groupId: string,
};

function TaskForm({tasksList,members,groupId}: Props) {


    const [localTasks, setLocalTasks] = React.useState(tasksList);

    

    const initialState: FormState = {
      error: undefined,
      success: undefined,
      newOne:undefined
    };
    const  [state,formAction,isPending]=useActionState(
      createTask,
      initialState
    )

    useEffect(() => {
      if (state.newOne) {
        setLocalTasks(prev => [...prev, state.newOne]);
      }
    }, [state.newOne]);

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
          required
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input type="hidden" name="groupId" value={groupId} />

        <label className="text-sm text-gray-600 font-medium">Prerequisites</label>
        <select
          name="prerequest"
          multiple
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {localTasks.map((task: { _id: string; taskName: string }) => (
            <option key={task._id} value={task._id}>
              {task.taskName}
            </option>
          ))}
        </select>

        <label className="text-sm text-gray-600 font-medium">Assigned To</label>
        <select
          name="members"
          required
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
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
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="text-sm text-gray-600 font-medium">Status</label>
        <select
          defaultValue="To Do"
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
          {isPending ? "Adding..." : "Add Entry"}
        </button>

        {state.error && (
          <p className="text-red-500 text-sm">Error: {state.error.message}</p>
        )}
        {state.newOne && (
          <p className="text-green-600 text-sm">✅ Task added successfully!</p>
        )}
        {isPending && <p className="text-blue-500 text-sm">Adding task...</p>}
      </form>
    </div>

  )
}

export default TaskForm