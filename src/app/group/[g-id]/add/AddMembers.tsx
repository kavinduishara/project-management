"use client";

import React, { useActionState } from 'react';
import { FormState, addMembers } from '@/actions/members';

type Props = {
  params: { "g-id": string };
};

function AddMembers({ params }: Props) {
  console.log("AddMembers component rendered with params:", params['g-id']);

  const initialState: FormState = {
    error: undefined,
    success: undefined,
  };

  const [state, formAction, isPending] = useActionState(addMembers, initialState);

  return (
    <>
      <form action={formAction} className="flex gap-4 flex-col">
        <input type="hidden" name="groupId" value={params['g-id']} />

        <input
          type="text"
          name="MemberName"
          placeholder="Add member"
          required
          className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />

        <input
          type="text"
          name="MemberRole"
          placeholder="Add role"
          required
          className="flex-1 border border-gray-300 rounded-lg p-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />

        <button
          type="submit"
          disabled={isPending}
          className={`w-full sm:w-auto bg-green-500 text-white font-semibold rounded-lg p-3 transition-all duration-200 ${
            isPending
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600 active:scale-95"
          }`}
        >
          {isPending ? "Adding..." : "Add"}
        </button>
      </form>

      {state?.error && (
        <p className="mt-4 text-sm text-red-500 text-center">{state.error.message}</p>
      )}
      {state?.success && (
        <p className="mt-4 text-sm text-green-600 text-center">✅ Member added successfully!</p>
      )}
    </>
  );
}

export default AddMembers;
