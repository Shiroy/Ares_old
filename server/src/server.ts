import express = require('express');
import serve_static = require('serve-static');
import http = require('http');
import morgan = require('morgan');
import {io} from './socket';

import {EntityManager} from './entities/entity_manager';
import {Entity} from './entities/entity';
import AresProtocol = require('ares-protocol');

let app = express();
let server = http.createServer(app);


io.attach(server);

app.use(morgan('dev'));

io.on('connection', (socket: SocketIO.Socket) => {
    console.log("Nouvelle connexion");
    let player = EntityManager._instance.addEntity("Player", AresProtocol.ModifyMessage.ObjectType.PLAYER, socket);
    player.addMe();
})

app.use(serve_static(__dirname + '/public', {
    index: ['index.html']
}));

server.listen(8080, function() {
    console.log("Server running on http://localhost:8080");
});
