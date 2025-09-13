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
    <div className="p-5 bg-white h-full">
      <h1 className="text-2xl font-bold mb-4">Timeline</h1>
      {/* Meeting content goes here */}
      
    </div>
  )
}

export default Timeline