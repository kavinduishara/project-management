"use server"
import { clerkClient } from "@clerk/nextjs/server";
import { addMemberToGroup } from "../../lib/groupCrud";
import { use } from "react";

export type FormState = {
    error?: Error;
    success?: boolean;
};

export async function addMembers(prevState: FormState, formData: FormData) {
    const memberName = formData.get("MemberName") as string;
    const MemberRole = formData.get("MemberRole") as string;
    const groupId = formData.get("groupId") as string;

    console.log("addMembers called");
    console.log("Form Data Received:", { memberName, groupId });   

    if (!memberName) {
        return { error: new Error("Name is required") };
    }

    try {
        const client = await clerkClient();
        const usersResponse = await client.users.getUserList({
            username: [memberName],
        });

        if (usersResponse.data.length === 0) {
            return { error: new Error("User not found") };
        }

        const user = usersResponse.data[0];
        if (!user.username) {
            return { error: new Error("User does not have a username") };
        }

        // ✅ Add as { name, role } object
        await addMemberToGroup(groupId, {
            name: user.username,
            role: MemberRole, // 👈 default role for new members
        });

        return { success: true };
    } catch (error) {
        console.error("Error in addMembers action:", error);
        return { error: new Error("Failed to add member to group") };
    }
}
