"use server";

import { addTask, changeTask } from "../../lib/taskCrud";
import { TaskType } from "../../lib/Tasks";

type TaskRecord = TaskType & { _id: string };

export type FormState = {
    error: string | null;
    success: boolean;
    newOne: TaskRecord | null;
};

// ---------------- CREATE ----------------
export async function createTask(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
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
    if (!groupID) return { error: "Group ID is required", success: false, newOne: null };
    if (!taskName) return { error: "Task name is required", success: false, newOne: null };
    if (!assignedTo?.length) return { error: "At least one member must be assigned", success: false, newOne: null };
    if (!status) return { error: "Status is required", success: false, newOne: null };
    if (isNaN(duration)) return { error: "Valid duration is required", success: false, newOne: null };

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
        return { error: null, success: true, newOne: newTask };
    } catch (error) {
        console.error("Error creating task:", error);
        return { error: "Failed to create task", success: false, newOne: null };
    }
}

// ---------------- UPDATE ----------------
export async function updateTask(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
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
    if (!groupID) return { error: "Group ID is required", success: false, newOne: null };
    if (!taskName) return { error: "Task name is required", success: false, newOne: null };
    if (!taskId) return { error: "Task ID is required", success: false, newOne: null };
    if (!assignedTo?.length) return { error: "At least one member must be assigned", success: false, newOne: null };
    if (!status) return { error: "Status is required", success: false, newOne: null };
    if (isNaN(duration)) return { error: "Valid duration is required", success: false, newOne: null };

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
        return { error: null, success: true, newOne: updatedTask };
    } catch (error) {
        console.error("Error updating task:", error);
        return { error: "Failed to update task", success: false, newOne: null };
    }
}
