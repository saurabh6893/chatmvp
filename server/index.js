const express = require('express')
const app = express()
// app is an instance of express
const http = require('http')
// http is variable to utilize http
const { Server } = require('socket.io')
// Server is an instance of Socket.io
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)

  socket.on('joinr', (data) => {
    socket.join(data)
  })

  socket.on('smessage', (data) => {
    socket.to(data.room).emit('recmsg', data)
  })
})

server.listen(3001, () => {
  console.log('Server is running on port 3001 like butter')
})
