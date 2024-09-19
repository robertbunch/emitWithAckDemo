const http = require('http') //we need this for an express server. part of node
//express sets up the http server and serves our front end
const express = require('express')
const app = express()
//seve everything in public statically
app.use(express.static('public'))
const socketio = require('socket.io')
const httpServer = http.createServer(app)
const io = socketio(httpServer)

io.on('connect',socket=>{
    console.log(socket.id, "has joined")
    // ackCb is added because we used emitWithAck, We DO NOT 
    // send it up
    socket.on('clientNeedsSomething',async (data,ackCb)=>{
        console.log("Doing server stuff...")
        // socket.emit('heresYourSomething',"Here's what you wanted")
        ackCb("Here's what you wanted")
    })
    setTimeout(async()=>{
        const response = await socket.emitWithAck('serverNeedsSomething',"Server Requesting Data Please...")
        console.log(response)
        //await...
        // socket.on('serverGetsSomething',response=>{
        //     console.log(response)
        //     //more code that has to wait for the reponse
        // })
    },2000)
})

httpServer.listen('3031')