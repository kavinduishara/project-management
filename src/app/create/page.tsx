"use client";
import React, { useActionState } from 'react'
import { FormState,createGroups } from '@/actions/groups'
import { redirect } from 'next/navigation';

function page() {

  const initialState: FormState = {
    error: undefined,
    success: undefined,
  };
  const  [state,formAction,isPending]=useActionState(
    createGroups,
    initialState
  )
  return (
    <>
    <div className="flex flex-col justify-center items-center text-center bg-gray-50 p-8">
      <h1 className="p-4 m-4 font-bold text-4xl text-gray-800">New Projects</h1>
      <form action={formAction}         
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="groupName"
          placeholder="Project Name"
          required
          className="border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
        />

        <button
          type="submit"
          disabled={isPending}
          className={`bg-orange-500 text-white font-semibold rounded-md p-3 transition-colors ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
          }`}
        >
          {isPending ? "Creating..." : "Create Project"}
        </button>
      </form>
      {state && state.error && <p>Error: {state.error.message}</p>}
      {state && state.success && redirect("/../groups")}
    </div>
    </>
  )
}

export default page