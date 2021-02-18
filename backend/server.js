import { createServer } from 'http';
import * as path from 'path';
import express from 'express';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true
  }
});

const __dirname = path.resolve();

io.on("connection", (socket) => {
  // console.log("server connected");
});

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(9000);

httpServer.listen(4000);
