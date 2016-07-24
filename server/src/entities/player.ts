import socket_io = require("socket.io");

import AresProtocol = require('ares-protocol');

let handlers: Map<String, Function> = new Map();

function handle(msg: string) {
    return function(target: any, name: string) {
        console.log(`Using "Player.${name}" to handle message "${msg}"`);
        handlers.set(msg, <Function>target[name]);
    }
}

export class Player {

    private _socket: SocketIO.Socket;

    constructor(socket: SocketIO.Socket){
        this._socket = socket;
        this.registerHandlers();
    }

    private registerHandlers() {
        handlers.forEach((handler: Function, message: string) => this._socket.on(message, handler.bind(this)));
    }

    @handle("foo")
    private handleFoo(msg: AresProtocol.MessageFoo) {

    }
}
