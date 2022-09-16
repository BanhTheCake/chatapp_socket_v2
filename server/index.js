const express = require('express');
require('dotenv').config()

const routersInit = require('./routes')
const socketInit = require('./socket')
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const config = require('./setUpMiddleware');
const connectDB = require('./config/connectDB');

const io = new Server(server, { cors: { origin: process.env.URL_CLIENT, credentials: true } });
const PORT = process.env.PORT || 3002

// connectDB
connectDB()

// Config middleWare
config(app)

// init Routers
routersInit(app)

// init Socket
socketInit(io)

server.listen(PORT, () => {
  console.log('listening on: ', PORT);
});