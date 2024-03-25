const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');
const { log } = require("console");

const PORT = process.env.PORT || 9001;
const app = express();


app.use(cors({
    origin:[
       "http://localhost:5500"
    ]
}));


const server = http.createServer(app);
const io = socketIO(server,{
    cors:{
        origin: "*",
        methods:["GET","POST"]
    }
});


io.on('connection', function(socket) {

    log("conection")
    RTCMultiConnectionServer.addSocket(socket);
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
