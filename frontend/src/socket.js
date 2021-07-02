import { io } from 'socket.io-client';

const url = 'http://localhost:9000';
const socket = io(url);

export default socket;
