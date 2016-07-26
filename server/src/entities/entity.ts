import AresProtocol = require("ares-protocol");
import {Reflector} from './reflector';
import {io} from '../socket';

export class Position {
    x: number;
    y: number;
}

export class Entity {
    private _id: number;
    private _position: Position;
    name: string;
    protected  _type: AresProtocol.ModifyMessage.ObjectType;

    protected _reflectors: Reflector = new Reflector();

    constructor(id: number, name: string){
        this._id = id;
        this.setInitialValues();
        this._type = AresProtocol.ModifyMessage.ObjectType.GAMEOBJECT
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

    protected createAddMessage(): AresProtocol.ModifyMessage.MessageModifyObject {
        let createMessage = new AresProtocol.ModifyMessage.MessageModifyObject();
        createMessage.id = this._id;
        createMessage.action = AresProtocol.ModifyMessage.Action.CREATE;

        let payload = new AresProtocol.ModifyMessage.CreatePart;
        payload.myself = false;
        payload.position = {
            x: 1200,
            y: 700
        };
        payload.type = this._type;
        payload.properties = this._reflectors.getPropertiesForCreation();

        createMessage.data = payload;

        return createMessage;
    }

    addMe() {
        let message = this.createAddMessage();
        io.emit('modifyObject', message)
        this._reflectors.markAsClean();
    }

    removeMe() {
        let removeMessage = new AresProtocol.ModifyMessage.MessageModifyObject();
        removeMessage.id = this._id;
        removeMessage.action = AresProtocol.ModifyMessage.Action.DELETE;
        removeMessage.data = null;
        io.emit("modifyObject", removeMessage);
    }

    setValue(name: string, value: string|number|boolean) {
        this._reflectors.setValue(name, value);
    }

    getValue(name: string): string|number|boolean {
        return this._reflectors.getValue(name);
    }
}
