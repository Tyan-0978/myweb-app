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

var messages = [
  {
    name: 'aaaaaaaaaaaaaaaaa',
    body: '1234',
    time: Date().substring(0,24)
  },
  {
    name: 'bb',
    body: '2784756721328940803630238901278436536310974832904163709578320432',
    time: Date().substring(0,24)
  }
];

// main socket.io works
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit('update messages', messages);

  // send initial messages when someone open chat
  socket.on('initial messages', () => {
    console.log('initialize chat');
    socket.emit('update messages', messages);
  });

  // someone sends a message
  socket.on('send message', (msg) => {
    console.log('new message received');
    messages.push(msg);
    socket.emit('update messages', messages);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// connection error
io.engine.on("connection_error", (err) => {
  console.log(err.req);	     // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

// serve frontend html file
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

httpServer.listen(9000, () => {
  console.log('listening on port 9000.');
});
/*
app.listen(9000, () => {
  console.log("Express server running.");
});
*/
