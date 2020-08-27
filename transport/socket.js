class Transport {
    constructor(server, path) {
        this._io = require('socket.io')(server, {path});

        this._io.on('connection', (socket) => {
            console.log('Client connected to socket');

            socket.on('disconnect', () => {
                console.log('Client disconnected from socket');
            });
        });
    }

    request(request) {
        this._io.sockets.emit('request', request);
    }
}

module.exports = Transport;
