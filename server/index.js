
const express = require('express')
const app = express()
const http = require ('http')
const cors = require ('cors')
const {Server} = require ('socket.io')
app.use(cors()) 
const server = http.createServer(app)


const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});

io.on("connection", (socket) =>{
    console.log(`User joined the chat ${socket.id}`);

    socket.on("join_room", (data) =>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined the room: ${data}`);
    })
    socket.on("send_message", (data) =>{
        socket.to(data.room).emit("receive_message", data)
        //console.log(data);
    })
    socket.on("disconnect", () =>{
        console.log("User has left the chat", socket.id);
    })

}) 


server.listen(5000,() =>{
    console.log("server has started")
})
