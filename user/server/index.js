const express=require("express")
var app=express()
const server = require("http").createServer(app,function(req,res){
  var name=url.parse(req.url,true).query("name")
});
const url=require("url")
const io = require("socket.io")(server
,{cors: {
  origin: '*',//192.168.43.98 or window.location.host"http://localhost:3000"
  methods: ["GET", "POST"]
}
})
const PORT = process.env.PORT||4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

var count=[];

io.sockets.on("connection", (socket) => {
  // Join a conversation
  var { roomId } = socket.handshake.query;
  socket.join(roomId);

  //Display that a new client has connected on the console and also increment the count
  count[roomId]?count[roomId]+=1:count[roomId]=1;
  console.log(`Client ${count[roomId]} ${socket.id} connected`);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("usercount",()=>{
    io.in(roomId).emit("usercount",count[roomId]-1)
  })

  socket.on("disconnect", () => {
    console.log(`Client ${count[roomId]} ${socket.id} disconnected`);
    count[roomId]-=1;
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});