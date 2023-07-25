const socketIO = require('socket.io');

const channelController = require('./app/controllers/channelController');

function setupSocket(server) {
  const io = socketIO(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('User connected: ', socket.id);

    socket.on('message', (data) => {
      io.emit('message', data);
    });
  });

  return io;
}

module.exports = setupSocket;
