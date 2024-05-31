const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
});

let locations = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  // Enviar las ubicaciones actuales al nuevo cliente
  socket.emit("locations", locations);

  socket.on("sendLocation", (location) => {
    locations.push(location);
    io.emit("locations", locations);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

io.listen(3001);
console.log('Socket.io server running on port 3001');
