"use client";

import React, { useEffect, useRef, useState } from "react";
import { Socket,io } from "socket.io-client";

type Props = {
  params: { "g-id": string },
  memberId: string
}

export default function Page({ params }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);


   const socketRef = useRef<Socket | null>(null);
    // const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
  socketRef.current = io("http://localhost:3001");
  socketRef.current.emit("join_room", params["g-id"]);

  socketRef.current.on("start_draw_other", (data: { x: number; y: number }) => {
    console.log("start_draw received", data);
    const ctx = contextRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(data.x, data.y);
      setIsDrawing(true);
    }
  });

  socketRef.current.on("draw_other", (data: { x: number; y: number }) => {
    console.log("draw received", data);
    const ctx = contextRef.current;
    if (ctx) {
      ctx.lineTo(data.x, data.y);
      ctx.stroke();
    }
  });

  socketRef.current.on("stop_draw_other", () => {
    console.log("stop_draw received");
    const ctx = contextRef.current;
    if (ctx) ctx.closePath();
    setIsDrawing(false);
  });

  return () => {
    socketRef.current?.disconnect();
  };
}, [params["g-id"]]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set actual resolution
      canvas.width = 800;
      canvas.height = 600;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        contextRef.current = ctx;
      }
    }
  }, []);

  const groupId = params["g-id"];

  const startDrawing = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);

      socketRef.current?.emit("start_draw", { roomId: groupId, x, y });
    }
  };

  const draw = (event: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();

      socketRef.current?.emit("draw", { roomId: groupId, x, y });
    }
  };

  const stopDrawing = () => {
    const ctx = contextRef.current;
    if (ctx) {
      ctx.closePath();
      socketRef.current?.emit("stop_draw", { roomId: groupId });
    }
    setIsDrawing(false);
  };


  
  return (
    <div className="p-5 m-3 bg-white  flex justify-center items-center">
        <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        // width={800}
        // height={600}
        className="border-2 "
      />
    </div>
      
  );
}
