const io = require('socket.io-client');
const socket = io.connect('https://holstor.online', {path: '/alisa'});

socket.on('connect', () => {
    console.log('Successfully connected!');
});

socket.on('request', ({action, options}) => {
    console.log(action, options);
});