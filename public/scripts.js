const socket = io('http://localhost:3031')
socket.on('serverNeedsSomething',(data,ackCb)=>{
    console.log("Server sent serverNeedsSomething")
    document.getElementById('response-button').innerHTML = data
    document.getElementById('response-button').addEventListener('click',()=>{
        // socket.emit('serverGetsSomething',"here you go")
        ackCb("here you go")
    })
})

const requestToServer = async()=>{
    const response = await socket.emitWithAck('clientNeedsSomething',{data:"data"})
    document.getElementById('request').innerHTML = response
    // socket.on('heresYourSomething',response=>{
    //     document.getElementById('request').innerHTML = response
    // })
}

document.getElementById('request-button').addEventListener('click',requestToServer)
