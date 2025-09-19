"use server"
import { currentUser } from "@clerk/nextjs/server";
import { createGroup } from "../../lib/groupCrud";

export type FormState = {
    error?: Error;
    success?: boolean;
};

export async function createGroups(prevState: FormState, formData: FormData) {
    const groupName = formData.get("groupName") as string;
    const author = await currentUser();

    if (!groupName) {
        return { error: new Error("Name is required") };
    }
    if (!author) {
        throw new Error("User not authenticated");
    }
    if (!author.username) {
        throw new Error("Username not found");
    }

    try {
        const id = author.username;
        await createGroup({
            groupName: groupName,
            members: [
                {
                    name: id,
                    role: "admin",
                    _id:author.id
                },
            ],
        });

        return { success: true };
    } catch (error) {
        console.error("Error creating group:", error);
        return { error: new Error("Failed to create group") };
    }
}
