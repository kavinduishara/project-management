import React from 'react'
import ChatForm from './ChatForm'
import { getMessageInGroup } from '../../../../../lib/messageCrud';

type Props = {
  params: Promise<{ "g-id": string }>
}

async function Chats({ params }: Props) {
  console.log("Chats page rendered with params:");
  const resolvedParams = await params;
  console.log(resolvedParams['g-id'])
  const messages=await getMessageInGroup(resolvedParams['g-id']);

  return (
    <div className="flex flex-col h-90 bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Group Chat</h1>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: any) => (
          <div
            key={message._id}
            className="flex flex-col max-w-md p-4 rounded-2xl shadow bg-white"
          >
            <p className="text-gray-900 text-sm">{message.message}</p>
            <p className="text-gray-400 text-xs text-right mt-1">
              {new Date(message.sentAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="w-full border-t bg-white p-4">
        <ChatForm params={resolvedParams} />
      </div>
    </div>

  )
}

export default Chats