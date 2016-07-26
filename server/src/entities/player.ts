import socket_io = require("socket.io");
import {Entity} from './entity';
import AresProtocol = require('ares-protocol');

import {Reflector} from './reflector';

let handlers: Map<String, Function> = new Map();

function handle(msg: string) {
    return function(target: any, name: string) {
        console.log(`Using "Player.${name}" to handle message "${msg}"`);
        handlers.set(msg, <Function>target[name]);
    }
}

export class Player extends Entity {

    private _socket: SocketIO.Socket;

    constructor(id: number, name: string, socket: SocketIO.Socket){
        super(id, name);
        this._type = AresProtocol.ModifyMessage.ObjectType.PLAYER;
        this._socket = socket;
        this.registerHandlers();
    }

    addMe() {
        let message = this.createAddMessage();

        message.data['myself'] = true;
        this._socket.emit("modifyObject", message);

        message.data['myself'] = false;
        this._socket.broadcast.emit("modifyObject", message);

        this._reflectors.markAsClean();
    }

    private registerHandlers() {
        handlers.forEach((handler: Function, message: string) => this._socket.on(message, handler.bind(this)));
    }

    @handle("foo")
    private handleFoo(msg: AresProtocol.MessageFoo) {

    }
}
