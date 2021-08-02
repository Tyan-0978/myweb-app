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

const __dirname = path.resolve();

var messages = [
  {
    name: 'aaaaaaaaaaaaaaaaa',
    body: 'casual message',
    category: 'casual',
    time: Date().substring(0,24)
  },
  {
    name: 'bb',
    body: '一般訊息2784756721328940803630238901278436536310974832904163709578320432',
    category: 'casual',
    time: Date().substring(0,24)
  },
  {
    name: 'ccc',
    body: 'school message 學校',
    category: 'school',
    time: Date().substring(0,24)
  },
  {
    name: 'ddddddddddddddddddddddddddddddddddddd',
    body: '食物12784756721328940803630238901278436536310974832904163709578320432',
    category: 'food',
    time: Date().substring(0,24)
  },
  {
    name: 'ee',
    body: 'food message',
    category: 'food',
    time: Date().substring(0,24)
  },
  {
    name: 'fff',
    body: 'food 2 adfqwpjiefovnaofa',
    category: 'food',
    time: Date().substring(0,24)
  },
  {
    name: 'ggggggg',
    body: 'games message',
    category: 'games',
    time: Date().substring(0,24)
  },
  {
    name: 'h',
    body: '遊戲訊息2784756721328940803630238901278436536310974832904163709578320432',
    category: 'games',
    time: Date().substring(0,24)
  }
];

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
  console.log("user connected");

  // send initial messages when someone open chat
  socket.on('load messages', (category) => {
    console.log('initialize chat');
    socket.emit('initialize messages', messages.filter(m => m.category === category));
  });

  // someone sends a message
  socket.on('send message', (msg) => {
    console.log('new message received');
    const newMessage = new ChatMessage(msg);
    newMessage.save((error, m) => {
      if (error) {
        console.error(error);
	return;
      }
      const allMessages = ChatMessage.find({});
      console.log(allMessages);
      io.emit('update messages', msg);
      console.log('message saved in db');
    });
    //messages.push(msg);
    //socket.emit('update messages', messages.filter(m => m.category === msg.category));
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
