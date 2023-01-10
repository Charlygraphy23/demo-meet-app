const { io } = require("socket.io-client");
const { getStream, createVideo } = require("../mediaStream");
const { v4 } = require('uuid')
const ownId = v4()
var peer = new Peer(ownId, {
    host: "localhost",
    port: 9000,
    path: '/peerjs'
});

const socket = io("localhost:3000");
const streamSet = new Set()


getStream().then(stream => {
    createVideo(stream , ownId)


    peer.on('call', function (call) {
        console.log("videoStream Found" )

        const otherUserId = call.peer

        // Answer the call, providing our mediaStream
        call.answer(stream);
        call.on('stream', function (otherUserStream) {
            // `stream` is the MediaStream of the remote peer.
            // Here you'd add it to an HTML video/canvas element.
            console.log("Other Stream ", otherUserStream.userId)

            if (!streamSet.has(otherUserStream.id)) {
                createVideo(otherUserStream , otherUserId)
                streamSet.add(otherUserStream.id)
            }



        });
    });



    socket.on("new-user-joined", (anotherUserId) => {

        // if(anotherUserId === ownId) return

        console.log("New User Called", anotherUserId)
        // pass media stream
        const _call = peer.call(anotherUserId, stream);
        console.log("After Call")
        _call.on('stream', function (otherUserStream ) {
            // `stream` is the MediaStream of the remote peer.
            // Here you'd add it to an HTML video/canvas element.
            console.log("Stream CALL", otherUserStream)

            if (!streamSet.has(otherUserStream.id)) {
                createVideo(otherUserStream, anotherUserId)
                streamSet.add(otherUserStream.id)
            }



        });
    })


}).catch(err => console.error(err))

peer.on("open", (myOwnId) => {

    console.log('My peer ID is: ' + myOwnId);
    setTimeout(() => {
        socket.emit("new-join", myOwnId, 10)
    },1000)

})


socket.on("delete-video" , (userId) => {
    console.log("userId" , userId)
    const video = document.getElementById(userId)
    video.remove()
})








