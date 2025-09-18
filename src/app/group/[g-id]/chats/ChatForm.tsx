"use client"
import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from "socket.io-client";
import { FormState, sendMessage } from '@/actions/sendMessage';
import { FaPaperPlane } from 'react-icons/fa';
import { useActionState } from 'react';

type Props = {
  params: { "g-id": string },
  memberId: string
}
interface MessageData {
  roomId: string
  message: string
  senderId: string
  sentAt?: string // Add sentAt for timestamp
  sender?: string // Add sender for display name
}

function ChatForm({ params, memberId }: Props) {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001");
    socketRef.current.emit("join_room", params['g-id']);

    // Listen for new messages
    socketRef.current.on("receive_msg", (msg: MessageData) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [params['g-id']]);

  const initialState: FormState = {
    error: undefined,
    success: undefined,
  };

  const [state, formAction, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      const result = await sendMessage(prevState, formData);
      if (result.success) {
        const message = formData.get("message") as string;
        const messageData: MessageData = {
          roomId: params['g-id'],
          message,
          senderId: memberId,
          sentAt: new Date().toISOString(),
          sender: memberId // You can modify this if you have a different display name
        };
        socketRef.current?.emit("send_msg", messageData);
        // Optionally add your own message immediately
        setMessages(prev => [...prev, messageData]);
      }
      return result;
    },
    initialState
  );

  return (
    <>
      <div className="mb-20">
        {messages.map((message, idx) => {
          const isCurrentUser = message.senderId === memberId;
          return (
            <div
              key={idx}
              className={`flex flex-col max-w-md p-4 rounded-2xl shadow ${
                isCurrentUser ? "ml-auto bg-sky-100" : "mr-auto bg-gray-100"
              }`}
            >
              <p className="text-gray-600 text-sm mb-2">{message.sender || message.senderId}</p>
              <p className="text-gray-900 text-sm">{message.message}</p>
              <p className="text-gray-400 text-xs text-right mt-1">
                {message.sentAt
                  ? new Date(message.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""}
              </p>
            </div>
          );
        })}
      </div>
       <form
        action={formAction}
        className="bottom-0 left-0 flex gap-3 justify-between w-full bg-white p-3 shadow-md border-t sticky"
      >
        <input
          type="text"
          name="message"
          placeholder="Type a message"
          required
          className="flex-1 w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <input
          type="hidden"
          name="groupId"
          value={params['g-id']}
          required
          className="flex-1 w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`bg-sky-500 text-white font-semibold rounded-md p-3 transition-colors ${
            isPending ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-600"
          }`}
        >
          <FaPaperPlane className="text-2xl"/>
        </button>
      </form> 
      
    </>
  );
}

export default ChatForm