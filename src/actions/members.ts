"use server"
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { addMemberToGroup, createGroup } from "../../lib/groupCrud";

export type FormState = {
    error?: Error;
    success?: boolean;
};

export async function addMembers(prevState: FormState, formData: FormData) {
    const memberName = formData.get("MemberName") as string;
    const groupId = formData.get("groupId") as string;
    console.log("addmembers called");
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
        await addMemberToGroup(groupId, user.username);
        return { success: true };
    } catch (error) {
        console.error("Error in addMembers action:", error);
        return { error: new Error("Failed to add member to group") };
    }
}
