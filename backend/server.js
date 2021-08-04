import { createServer } from 'http';
import * as path from 'path';
import express from 'express';
import { Server } from 'socket.io';

import mongoose from 'mongoose';
import ChatMessage from './models/ChatMessage.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true
  }
});

// this directory ( myweb_app/backend )
const __dirname = path.resolve();

// connect to database
const db_url = 'mongodb://localhost:27017/myweb_db';
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('database connected');
});

// main socket.io works
io.on("connection", (socket) => {
  socket.removeAllListeners();
  console.log(`user ${socket.id} connected`);

  // send initial messages when someone open chat
  socket.on('load messages', async (category) => {
    console.log('initialize chat');
    const initMessages = await ChatMessage.find({ category: category })
    socket.emit('initial messages', initMessages);
  });

  // someone sends a message
  socket.on('send message', async (msg) => {
    console.log('new message received');
    const newMessage = new ChatMessage(msg);
    await newMessage.save( async (error, m) => {
      if (error) {
        console.error(error);
	return;
      }

      // emit new message to every client
      io.emit('update messages', newMessage);
      console.log('new message emitted');
    });
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
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
