import React, { useRef,useState } from 'react'
import { Socket } from 'socket.io-client';

function Timeline() {
  // const socketRef = useRef<Socket | null>(null);
  //   const [messages, setMessages] = useState<MessageData[]>([]);
  
  //   useEffect(() => {
  //     socketRef.current = io("http://localhost:3001");
  //     socketRef.current.emit("join_room", params['g-id']);
  
  //     // Listen for new messages
  //     socketRef.current.on("receive_msg", (msg: MessageData) => {
  //       setMessages(prev => [...prev, msg]);
  //     });
  
  //     return () => {
  //       socketRef.current?.disconnect();
  //     };
  //   }, [params['g-id']]);
  return (
    <div>
        <div className="p-4 border-b bg-white shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">Timeline</h1>
        </div>
    </div>
  )
}

export default Timeline