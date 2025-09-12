"use server"

import { sendMessageToGroup } from "../../lib/messageCrud";

export type FormState = {
    error?: Error;
    success?: boolean;
};

export async function sendMessage(pevState:FormState,formData: FormData) {
    const message = formData.get("message") as string;
    const groupId = formData.get("groupId") as string;
    try {
        await sendMessageToGroup(groupId, message);
        return { success: true };
    }
    catch (error) {
        return { error: new Error("Failed to create product") };
    }
}
