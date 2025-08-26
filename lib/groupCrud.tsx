import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "./dbConnect";
import Group from "./Group";

export async function createGroup(groupData:{groupName: string, members: string[]}) {
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

export async function addMemberToGroup(groupId: string) {
    await dbConnect();
    try {
        const user = await currentUser(); 
        const memberId = user?.id;
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: memberId } }, // Use $addToSet to avoid duplicates
            { new: true }
        );
        console.log("Member added to group:", updatedGroup);
        return JSON.parse(JSON.stringify(updatedGroup)); // serialize for React
    } catch (error) {
        console.error("Error adding member to group:", error);
        return null;
    }
}

export async function getMyGroups() {
    await dbConnect();
    try {
        const user = await currentUser(); 
        const memberId = user?.id; // Assuming user ID is used as member ID
        const groups = await Group.find({ members: { $in :[memberId]} });
        console.log("Groups for member:", groups);
        return JSON.parse(JSON.stringify(groups)); // serialize for React
    } catch (error) {
        console.error("Error fetching groups for member:", error);
        return [];
    } 
}