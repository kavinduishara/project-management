"use server";

import { redirect } from "next/dist/server/api-utils";
import { addTask,changeTask } from "../../lib/taskCrud";
import { TaskType } from "../../lib/Tasks";

export type FormState = {
    error?: Error;
    success?: boolean;
    newOne?:TaskType
};

export async function createTask(prevState: FormState, formData: FormData) {

    console.log("FormData entries:");
    const groupID = formData.get("groupId") as string;
    const taskName = formData.get("title") as string;
    const preRequsitse = formData.getAll("preRequsitse") as string[];
    const assignedTo = formData.getAll("members") as string[];
    const status = formData.get("status") as 'To Do' | 'In Progress' | 'Done';
    const durationStr = formData.get("duration") as string;
    const duration = durationStr ? Number(durationStr) : undefined;
    const progressStr = formData.get("progress") as string;
    const progress = progressStr ? Number(progressStr) : undefined;

    console.log("groupID", groupID);
    console.log("taskName", taskName);
    console.log("preRequsitse", preRequsitse);
    console.log("assign to",assignedTo);
    console.log("status", status);
    console.log("duration", duration);
    console.log("progress", progress);
    if (!groupID) {
        return { error: new Error("Group ID is required") };
    }
    if (!taskName) {
        return { error: new Error("Task name is required") };
    }
    if (!assignedTo || assignedTo.length === 0) {
        return { error: new Error("At least one member must be assigned") };
    }
    if (!status) {
        return { error: new Error("Status is required") };
    }
    if (!duration || isNaN(duration)) {
        return { error: new Error("Valid duration is required") };
    }


    try {
        const newTask= await addTask({
            groupID,
            taskName,
            preRequsitse,
            assignedTo,
            status,
            createdAt: new Date(),
            duration,
            progress,
        });
        return { newOne:newTask  };
    } catch (error) {
        return { error: new Error("Failed to create task") };
    }
}


export async function updateTask(prevState: FormState, formData: FormData) {

    console.log("FormData entries:");
    const groupID = formData.get("groupId") as string;
    const taskName = formData.get("title") as string;
    const task = formData.get("task") as string;
    const preRequsitse = formData.getAll("preRequsitse") as string[];
    const assignedTo = formData.getAll("members") as string[];
    const status = formData.get("status") as 'To Do' | 'In Progress' | 'Done';
    const durationStr = formData.get("duration") as string;
    const duration = durationStr ? Number(durationStr) : undefined;
    const progressStr = formData.get("progress") as string;
    const progress = progressStr ? Number(progressStr) : undefined;

    console.log("groupID", groupID);
    console.log("taskName", taskName);
    console.log("preRequsitse", preRequsitse);
    console.log("assign to",assignedTo);
    console.log("status", status);
    console.log("duration", duration);
    console.log("progress", progress);
    if (!groupID) {
        return { error: new Error("Group ID is required") };
    }
    if (!taskName) {
        return { error: new Error("Task name is required") };
    }
    if (!assignedTo || assignedTo.length === 0) {
        return { error: new Error("At least one member must be assigned") };
    }
    if (!status) {
        return { error: new Error("Status is required") };
    }
    if (!duration || isNaN(duration)) {
        return { error: new Error("Valid duration is required") };
    }


    try {
        const newTask= await changeTask(task,{
            groupID,
            taskName,
            preRequsitse,
            assignedTo,
            status,
            createdAt: new Date(),
            duration,
            progress,
        });
        return { success:true  };
    } catch (error) {
        return { error: new Error("Failed to create task") };
    }
}