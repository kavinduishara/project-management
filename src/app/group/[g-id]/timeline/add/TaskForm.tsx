"use client";

import React, { useActionState, useEffect } from "react";
import { createTask, FormState } from "@/actions/task";

type Props = {
  tasksList: { _id: string; taskName: string }[];
  members: {name:string,role:string}[];
  groupId: string;
};

function TaskForm({ tasksList, members, groupId }: Props) {
  const [localTasks, setLocalTasks] = React.useState(tasksList);

  const initialState: FormState = {
    error: null,
    success: false,
    newOne: null,
  };

  const [state, formAction, isPending] = useActionState(
    createTask,
    initialState
  );

  useEffect(() => {
    if (state.newOne) {
      setLocalTasks((prev) => [
        ...prev,
        { _id: state.newOne!._id, taskName: state.newOne!.taskName },
      ]);
    }
  }, [state.newOne]);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-2xl shadow-lg"
        action={formAction}
      >
        <h1 className="text-2xl font-bold text-gray-800 md:col-span-2">
          Add New Task
        </h1>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            placeholder="Task Title"
            name="title"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input type="hidden" name="groupId" value={groupId} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Duration (hours)
          </label>
          <input
            type="number"
            placeholder="Duration"
            name="duration"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Prerequisites as checkboxes */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">
            Prerequisites
          </label>
          <div className="border border-gray-300 rounded-xl p-3 h-40 overflow-y-auto">
            {localTasks.length > 0 ? (
              localTasks.map((task) => (
                <label key={task._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="prerequest"
                    value={task._id}
                    className="w-4 h-4 accent-green-500"
                  />
                  <span>{task.taskName}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-400 text-sm">— No prerequisites —</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Assigned To</label>
          <select
            name="members"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {members.map((member) => (
              <option key={member.name} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-600">Status</label>
          <select
            defaultValue="To Do"
            name="status"
            required
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-green-500 text-white py-2 px-6 rounded-xl hover:bg-green-600 disabled:opacity-50 transition-all"
          >
            {isPending ? "Adding..." : "Add Task"}
          </button>
        </div>

        {/* Feedback messages */}
        {state.error && (
          <p className="text-red-500 text-sm md:col-span-2 mt-2">
            Error: {state.error}
          </p>
        )}
        {state.newOne && (
          <p className="text-green-600 text-sm md:col-span-2 mt-2">
            ✅ Task added successfully!
          </p>
        )}
        {isPending && (
          <p className="text-blue-500 text-sm md:col-span-2 mt-2">
            Adding task...
          </p>
        )}
      </form>
    </div>
  );
}

export default TaskForm;
