"use client";
import React, { useActionState } from 'react'
import { FormState,addMembers } from '@/actions/members'
import { redirect } from 'next/navigation';

type Props = {
  params: { "g-id": string }
}


function AddMembers({ params }: Props) {
    console.log("AddMembers component rendered with params:");
    console.log(params['g-id'])


  const initialState: FormState = {
    error: undefined,
    success: undefined,
  };
  const  [state,formAction,isPending]=useActionState(
    addMembers,
    initialState
  )
  return (
    <>
    <div className="flex flex-col justify-center items-center text-center bg-gray-50 p-8">
      <h1 className="p-4 m-4 font-bold text-4xl text-gray-800">Add Members</h1>
      <form action={formAction}         
        className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
      >
        <input
          type="hidden"
          name="groupId"
          value={params['g-id']}
        />
        <input
          type="text"
          name="MemberName"
          placeholder="Member Name"
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
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>
      {state && state.error && <p>Error: {state.error.message}</p>}
      {state && state.success && <div>Member added successfully!</div>}
    </div>
    </>
  )
}

export default AddMembers