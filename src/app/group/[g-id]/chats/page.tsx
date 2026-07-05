import React from 'react'
import ChatForm from './ChatForm'
import { getMessageInGroup } from '../../../../../lib/messageCrud';
import { currentUser } from '@clerk/nextjs/server';

type Props = {
  params: Promise<{ "g-id": string }>
}

type Message = {
  _id: string;
  sender: string;
  message: string;
  sentAt: string;
}

async function Chats({ params }: Props) {
  const resolvedParams = await params;
  const messages: Message[] = await getMessageInGroup(resolvedParams['g-id']);

  const user = await currentUser(); 
  const memberId = user?.username || "Unknown";

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Group Chat</h1>
      </div>

      {/* Messages area */}
      <div className="flex-1 flex-col-reverse overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = message.sender === memberId;
          return (
            <div
              key={message._id}
              className={`flex flex-col max-w-md p-4 rounded-2xl shadow ${
                isCurrentUser ? "ml-auto bg-green-100" : "mr-auto bg-gray-100"
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

        <ChatForm params={{ ...resolvedParams }} memberId={memberId} />
      </div>
      
      
    </div>
  )
}

export default Chats