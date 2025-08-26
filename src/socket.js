// src/socket.js
import { io } from 'socket.io-client';
import { HOST, HOST_PORT_SEPARATOR, PORT } from './Utils/Parameters.jsx';

const URL = `${HOST}${HOST_PORT_SEPARATOR}${PORT}`;
export const socket = io(URL, { autoConnect: false });  // Disable auto-connect for manual control