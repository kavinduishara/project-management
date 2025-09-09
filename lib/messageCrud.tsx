import { currentUser } from "@clerk/nextjs/server";
import dbConnect from "./dbConnect";
import Message from "./Message";


export async function getMessageInGroup(id:string) {
    await dbConnect();
    try {
        const messages = await Message.find({ groupId:id });
        console.log("messagesr:", messages);
        return JSON.parse(JSON.stringify(messages));
    } catch (error) {
        console.error("Error fetching groups for member:", error);
        return [];
    } 
}

export async function sendMessageToGroup(id: string, message: string) {
  await dbConnect();
  try {
    const user = await currentUser(); 
    const memberId = user?.id;

    if (!memberId) {
      throw new Error("No authenticated user found");
    }

    const newMessage = await Message.create({
      groupId: id,
      sender: memberId,
      message: message,
      sentAt: new Date(),   // ✅ set timestamp to now
    });

    console.log("New Message Sent:", newMessage);
    return JSON.parse(JSON.stringify(newMessage)); 
  } catch (error) {
    console.error("Error sending message to group:", error);
    return null; // ✅ return null instead of [] (messages are objects, not arrays)
  } 
}

