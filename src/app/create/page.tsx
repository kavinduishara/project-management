import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import { createGroup } from '../../../lib/groupCrud';
function page() {
    async function handleSubmit(formData: FormData) {
        "use server";
        const author = await currentUser();
        if (!author) {
            throw new Error("User not authenticated");
        }
        if(!author.username){
            throw new Error("Username not found");
        }
        try {
            const id = author.id;
            const groupName = formData.get("groupName") as string;
            await createGroup({ groupName:groupName,members: [id] });
        } catch (error) {
            console.error("Error creating group:", error);
        }
        
    }

  return (
    <div>
        <h1>Create a New Group</h1>
        <form action={handleSubmit}>
            <input type="text" name="groupName" placeholder="Group Name" required />
            <button type="submit">Create Group</button>
        </form>
    </div>
  )
}

export default page