const io = require("socket.io")(8000);

const users = {};

io.on("connection", (socket) => {
  socket.on("newUser-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (msg) => {
    socket.broadcast.emit("receive", { msg: msg, name: users[socket.id] });
  });

  socket.on("disconnect", (msg) => {
    socket.broadcast.emit("leave", users[socket.id]);
    delete users[socket.id];
  });
});
