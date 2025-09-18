"use server";

import { addTask, changeTask } from "../../lib/taskCrud";
import { TaskType } from "../../lib/Tasks";

export type FormState = {
    error?: Error;
    success?: boolean;
    newOne?: TaskType;
};

// ---------------- CREATE ----------------
export async function createTask(prevState: FormState, formData: FormData) {
    const groupID = formData.get("groupId") as string;
    const taskName = formData.get("title") as string;
    const preRequsitse = formData.getAll("prerequest") as string[];
    const assignedTo = formData.getAll("members") as string[];
    const status = formData.get("status") as "To Do" | "In Progress" | "Done";
    const durationStr = formData.get("duration") as string;
    const duration = durationStr ? Number(durationStr) : NaN;
    const progressStr = formData.get("progress") as string;
    const progress = progressStr ? Number(progressStr) : undefined;

    // ✅ Validation
    if (!groupID) return { error: new Error("Group ID is required") };
    if (!taskName) return { error: new Error("Task name is required") };
    if (!assignedTo?.length) return { error: new Error("At least one member must be assigned") };
    if (!status) return { error: new Error("Status is required") };
    if (isNaN(duration)) return { error: new Error("Valid duration is required") };

    try {
        const newTask = await addTask({
            groupID,
            taskName,
            preRequsitse,
            assignedTo,
            status,
            createdAt: new Date(),
            duration,
            progress,
        });
        return { newOne: newTask };
    } catch (error) {
        console.error("Error creating task:", error);
        return { error: new Error("Failed to create task") };
    }
}

// ---------------- UPDATE ----------------
export async function updateTask(prevState: FormState, formData: FormData) {
    const groupID = formData.get("groupId") as string;
    const taskName = formData.get("title") as string;
    const taskId = formData.get("task") as string;
    const preRequsitse = formData.getAll("prerequest") as string[];
    const assignedTo = formData.getAll("members") as string[];
    const status = formData.get("status") as "To Do" | "In Progress" | "Done";
    const durationStr = formData.get("duration") as string;
    const duration = durationStr ? Number(durationStr) : NaN;
    const progressStr = formData.get("progress") as string;
    const progress = progressStr ? Number(progressStr) : undefined;

    // ✅ Validation
    if (!groupID) return { error: new Error("Group ID is required") };
    if (!taskName) return { error: new Error("Task name is required") };
    if (!taskId) return { error: new Error("Task ID is required") };
    if (!assignedTo?.length) return { error: new Error("At least one member must be assigned") };
    if (!status) return { error: new Error("Status is required") };
    if (isNaN(duration)) return { error: new Error("Valid duration is required") };

    try {
        const updatedTask = await changeTask(taskId, {
            groupID,
            taskName,
            preRequsitse,
            assignedTo,
            status,
            duration,
            progress,
        });
        return { success: true, newOne: updatedTask };
    } catch (error) {
        console.error("Error updating task:", error);
        return { error: new Error("Failed to update task") };
    }
}
