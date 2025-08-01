import { Server } from 'mock-socket';

const { baseURL } = require('../../app/axios/constants');

// create a WS instance, listening on baseURL
let serverInstance = null;

const server = {
  listen() {
    serverInstance = new Server(`${baseURL.replace('http://', 'ws://')}/socket.io-client`);
  },
  close() {
    serverInstance.stop();
  },
};

export default server;
