import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "./dbConnect";
import Group from "./Group";

// Create a group
export async function createGroup(groupData: { groupName: string, members: { name: string, role: string }[] }) {
    await dbConnect();
    try {
        console.log("Creating group with data:", groupData);
        const newGroup = await Group.create({
            groupName: groupData.groupName,
            members: groupData.members,
        });
        console.log("New Group Created:", newGroup);
        return JSON.parse(JSON.stringify(newGroup)); // serialize for React
    } catch (error) {
        console.error("Error creating group:", error);
        return null;
    }
}

// Add member to a group
export async function addMemberToGroup(groupId: string, member: { name: string, role: string }) {
    await dbConnect();
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: member } }, // Avoids duplicates
            { new: true }
        );
        console.log("Member added to group:", updatedGroup);
        return JSON.parse(JSON.stringify(updatedGroup)); // serialize for React
    } catch (error) {
        console.error("Error adding member to group:", error);
        return null;
    }
}

// Get groups for current user
export async function getMyGroups() {
    await dbConnect();
    try {
        const user = await currentUser(); 
        const memberName = user?.username; // Assuming username is stored as `name` in members
        if (!memberName) return [];

        const groups = await Group.find({ "members.name": memberName });
        return JSON.parse(JSON.stringify(groups)); // serialize for React
    } catch (error) {
        console.error("Error fetching groups for member:", error);
        return [];
    } 
}

// Find group by ID
export async function findGroupById(id: string) {
    await dbConnect();
    try {
        const group = await Group.findById(id);
        return JSON.parse(JSON.stringify(group)); // serialize for React
    } catch (error) {
        console.error("Error fetching group by ID:", error);
        return null;
    } 
}
