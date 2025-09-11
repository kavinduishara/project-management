import React from 'react'
import ChatForm from './ChatForm'
import { getMessageInGroup } from '../../../../../lib/messageCrud';
import { currentUser } from '@clerk/nextjs/server';

type Props = {
  params: Promise<{ "g-id": string }>
}

async function Chats({ params }: Props) {
  console.log("Chats page rendered with params:");
  const resolvedParams = await params;
  console.log(resolvedParams['g-id'])
  const messages=await getMessageInGroup(resolvedParams['g-id']);

  const user = await currentUser(); 
  const memberId = user?.username;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Group Chat</h1>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: any) => {
          const isCurrentUser = message.sender === memberId;
          return (
            <div
              key={message._id}
              className={`flex flex-col max-w-md p-4 rounded-2xl shadow ${
                isCurrentUser ? "ml-auto bg-orange-100" : "mr-auto bg-gray-100"
              }`}
            >
              <p className="text-gray-600 text-sm mb-2">{message.sender}</p>
              <p className="text-gray-900 text-sm">{message.message}</p>
              <p className="text-gray-400 text-xs text-right mt-1">
                {new Date(message.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chat input */}
      {/* <div className="w-full justify-between border-t bg-white p-4">
        <ChatForm params={resolvedParams} />
      </div> */}
      <ChatForm params={resolvedParams} />
    </div>


  )
}

export default Chats