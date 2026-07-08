const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const httpServer = http.createServer()

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)
  socket.on('join_room', (roomId) => {
    socket.join(roomId)
    console.log(`user with id-${socket.id} joined room - ${roomId}`)
  })

  socket.on('send_msg', (data) => {
    console.log(data, 'DATA')
    //This will send a message to a specific room ID
    socket.to(data.roomId).emit('receive_msg', data)
  })

  socket.on('start_draw', (data) => {
    console.log('Drawing started', data)
    socket.to(data.roomId).emit('start_draw_other', data)
  })

  socket.on('draw', (data) => {
    console.log('Drawing', data)
    socket.to(data.roomId).emit('draw_other', data)
  })

  socket.on('stop_draw', (data) => {
    console.log('Drawing stopped', data)
    socket.to(data.roomId).emit('stop_draw_other', data)
  })


  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})