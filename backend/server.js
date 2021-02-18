import { createServer } from 'http';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true
  }
});

io.on("connection", (socket) => {
  // console.log("server connected");
});

httpServer.listen(4000);
