// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());

// const server = http.createServer(app);
// const users = {};

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   // socket.on("send_message", (data) => {
//   //     console.log(data)
//   // })

//   //   socket.on("send_message", (data) => {
//   //     socket.broadcast.emit("receive_message", data);
//   //   });

//   //   socket.on("message", (data) => {
//   //     socket.emit("receive_message", data);
//   //   })

//   // socket.on("join_room", (data) => {
//   //     socket.join(data)
//   //     console.log(data, " joined")
//   // })

//   // socket.on("send_message", (data) => {
//   //     socket.to(data.rishabh).emit("receive_message", data)
//   //     console.log(data, "+", data.rishabh)
//   // })

//   // socket.on("send_message_1", (data) => {
//   //     socket.to(data.alish).emit("receive_message", data)
//   // })

//   console.log(`User connected: ${socket.id}`);

//   socket.on('authenticate', (userId) => {
//      // Associate the user ID with the socket ID
//      users[socket.id] = userId;
//     // console.log(users[socket.id], "socket.idsocket.idsocket.id")
//   });

//   // Handle incoming messages
//   socket.on("sendMessage", (data) => {
//     // Broadcast the message to all connected clients
//     io.emit("receiveMessage", { sender: socket.id, message: data.message });
//   });

//   // Handle incoming private messages
//   socket.on('privateMessage', (data) => {
//     const { targetUserId, message } = data;
//     const senderUserId = users[socket.id];

//     const targetSocketId = Object.keys(users).find((id) => users[id] === targetUserId);

//     console.log(targetSocketId, senderUserId)

//     if (targetSocketId) {
//       // Emit the private message only to the sender and target user
//       io.to(socket.id).emit('receiveMessage', { sender: senderUserId, message });
//       io.to(targetSocketId).emit('receiveMessage', { sender: senderUserId, message });
//     }
//     else {
//       // Handle the case when the target user is not online
//       console.log(`User ${targetUserId} is not online.`);
//       // Optionally, you can emit a message to the sender indicating that the target user is not online
//       io.to(socket.id).emit('userNotOnline', { targetUserId });
//     }

//     // const { userId, message } = data;
//     // console.log(userId, "userId")
//     // console.log(socket.id,"socket.id")
//     // console.log(message)

//     // Emit the private message only to the sender and target user
//     // io.to(socket.id).emit('receiveMessage', { sender: "dfjkghjdafh", message });
//     // io.to(userId).emit('receiveMessage', { sender: "8950208255", message });
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// server.listen(3001, () => {
//   console.log("server is running");
// });

const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;

const users = [{}];

app.use(cors());
app.get("/", (req, res) => {
  res.send("its working");
});

const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New Connection");

  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(user, " has joned");
    socket.broadcast.emit('userJoined', {user: "Admin", message: `${users[socket.id]} has joined`})
    socket.emit('welcome', {user: "Admin", message: "Welcome to the chat"})
  });

  socket.on('disconnected', () => {
    socket.broadcast.emit('leave', {user: "Admin", message: `${users[socket.id]} has left`})
    console.log(`${users[socket.id]} has left`);
  })

});

server.listen(port, () => {
  console.log(`server is working on ${port}`);
});
