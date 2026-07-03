import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;
const httpServer = createServer();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`user ${socket.id} joined room ${roomId}`);
  });

  socket.on("send_msg", (data) => {
    socket.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("start_draw", (data) => {
    socket.to(data.roomId).emit("start_draw_other", data);
  });

  socket.on("draw", (data) => {
    socket.to(data.roomId).emit("draw_other", data);
  });

  socket.on("stop_draw", (data) => {
    socket.to(data.roomId).emit("stop_draw_other", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});