import express = require('express');
import serve_static = require('serve-static');
import http = require('http');
import morgan = require('morgan');
import socket_io = require("socket.io");
import {Observer} from './util/signal';

let app = express();
let server = http.createServer(app);
let io = socket_io();

io.attach(server);

app.use(morgan('dev'));

io.on('connection', () => {
    console.log("Nouvelle connexion");
    Observer.emit("new-connection");
})

app.use(serve_static(__dirname + '/public', {
    index: ['index.html']
}));

server.listen(8080, function() {
    console.log("Server running on http://localhost:8080");
});
