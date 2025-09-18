"use client";

import React, { useActionState } from "react";
import { updateTask, FormState } from "@/actions/task";
import { TaskType } from "../../../../../../lib/Tasks";
import { redirect } from "next/navigation";

type TasksType = {
  _id: string;
} & TaskType;

type Props = {
  tasksList: { _id: string; taskName: string }[];
  members: {name:string,role:string}[];
  groupId: string;
  task: TasksType;
};

function TaskForm({ tasksList, members, groupId, task }: Props) {
  const initialState: FormState = {
    error: undefined,
    success: undefined,
    newOne: undefined,
  };

  const [state, formAction, isPending] = useActionState(
    updateTask,
    initialState
  );

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white rounded-2xl shadow-lg border border-gray-200"
        action={formAction}
      >
        <h1 className="text-2xl font-bold text-gray-800 md:col-span-2">
          Edit Task
        </h1>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={task.taskName}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">
            Duration (hours)
          </label>
          <input
            type="number"
            name="duration"
            defaultValue={task.duration}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Prerequisites */}
        <div className="flex flex-col gap-2 md:col-span-2">

          <div className="flex flex-col gap-2">
  <label className="text-sm font-medium text-gray-600">Prerequisites</label>
  <div className="border  border-gray-300 rounded-xl p-3 h-40 overflow-y-auto">
    {tasksList
      .filter((t) => t._id !== task._id) // exclude the current task
      .map((t) => (
        <label key={t._id} className="flex items-center gap-2">
          <input
            type="checkbox"
            name="prerequest"
            value={t._id}
            defaultChecked={task.preRequsitse?.includes(t._id)}
            className="w-4 h-4 accent-sky-500"
          />
          <span>{t.taskName}</span>
        </label>
      ))}
    {tasksList.filter((t) => t._id !== task._id).length === 0 && (
      <p className="text-gray-400 text-sm">— No prerequisites —</p>
    )}
  </div>
</div>

        </div>

        {/* Assigned To */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">
            Assigned To
          </label>
          <select
            name="members"
            defaultValue={task.assignedTo?.[0] || ""}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">— No members —</option>
            {members.map((member) => (
              <option key={member.name} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 font-medium">Status</label>
          <select
            name="status"
            defaultValue={task.status}
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Hidden values */}
        <input type="hidden" name="groupId" value={groupId} />
        <input type="hidden" name="task" value={task._id} />

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="bg-sky-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-sky-600 disabled:opacity-50 transition"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Messages */}
        {state.error && (
          <p className="text-red-500 text-sm md:col-span-2">
            ❌ Error: {state.error.message}
          </p>
        )}
        {state.success && redirect("../timeline")}
      </form>
    </div>
  );
}

export default TaskForm;
