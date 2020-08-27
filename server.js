const path = '/alisa';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const Transport = require('./transport/socket.js');
const transport = new Transport(server, path);
const transform = require('./transform.js');

const port = process.env.PORT || 3000;

app.use(express.json());

app.post(path, (req, res) => {
    const {version, session} = req.body;
    const {command} = req.body.request;
    const {action, responseText, options} = transform(req.body.request);
    console.log(`Command: ${command}`);
    const body = {
        version,
        session,
        response: {
            text: responseText,
            end_session: command === 'end session',
        },
    };
    switch (command) {
        case 'no text':
            body.response.text = '';
            break;
        case 'no version':
            delete body.version;
            break;
        case 'no session':
            delete body.version;
            break;
    }
    transport.request({action, options});
    res.json(body);
});

app.use('*', function (req, res) {
    res.sendStatus(404);
});

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
