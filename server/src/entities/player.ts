import socket_io = require("socket.io");

import AresProtocol = require('ares-protocol');

import {Reflector} from './reflector';

let handlers: Map<String, Function> = new Map();

function handle(msg: string) {
    return function(target: any, name: string) {
        console.log(`Using "Player.${name}" to handle message "${msg}"`);
        handlers.set(msg, <Function>target[name]);
    }
}

export class Player {

    private _socket: SocketIO.Socket;
    private _reflectors: Reflector = new Reflector();

    constructor(socket: SocketIO.Socket){
        this._socket = socket;
        this.registerHandlers();
        this.setInitialValues();
        this.addMe();
        this._reflectors.markAsClean();
    }

    private setInitialValues(){
        this._reflectors.setValue("health", 500);
        this._reflectors.setValue("maxHealth", 500);
        this._reflectors.setValue("healthRegenRate", 1.0);
        this._reflectors.setValue("power", 60);
        this._reflectors.setValue("maxPower", 60);
        this._reflectors.setValue("powerRegenRate", 2.0);
        this._reflectors.setValue("sprite", "img/char_64_64_player.png");
        this._reflectors.setValue("animation", "none");
        this._reflectors.setValue("scope", 230);
        this._reflectors.setValue("speed", 300);
    }

    private addMe() {
        let createMessage = new AresProtocol.ModifyMessage.MessageModifyObject();
        createMessage.id = 1;
        createMessage.action = AresProtocol.ModifyMessage.Action.CREATE;

        let payload = new AresProtocol.ModifyMessage.CreatePart;
        payload.myself = true;
        payload.position = {
            x: 1200,
            y: 700
        };
        payload.type = AresProtocol.ModifyMessage.ObjectType.PLAYER;
        payload.properties = this._reflectors.getPropertiesForCreation();

        createMessage.data = payload;

        console.log(createMessage);

        this._socket.emit('modifyObject', createMessage);
        payload.myself = false;
        this._socket.broadcast.emit('modifyObject', createMessage);
    }

    private registerHandlers() {
        handlers.forEach((handler: Function, message: string) => this._socket.on(message, handler.bind(this)));
    }

    @handle("foo")
    private handleFoo(msg: AresProtocol.MessageFoo) {

    }

    setValue(name: string, value: string|number|boolean) {
        this._reflectors.setValue(name, value);
    }

    getValue(name: string): string|number|boolean {
        return this._reflectors.getValue(name);
    }
}
