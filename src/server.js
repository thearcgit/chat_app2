import express from 'express'
import http from 'http'
import cors from 'cors'
import {Server} from 'socket.io'


const app = express()


const port = process.env.PORT || 5050

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:`http://localhost:3000`,
        methods:['GET','POST']

    }
})

io.on('connection', (socket) => {
    console.log(`user connected : ${socket.id}`)

    socket.on('join_room',(data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message',data)
        console.log('data is:',data)
    })
    
    socket.on('disconnect', () => {
        console.log(`user disconnected ;${socket.id}`)
    })
})

server.listen(port,() => {
    console.log(`server is running at port ${port}`)
})

