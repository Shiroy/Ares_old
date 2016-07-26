import AresProtocol = require("ares-protocol");
import {Entity} from './entity';
import {Player} from './player';

let id_generator = (function() {
    let counter = 0;

    return function() {
        counter++;
        return counter;
    }
})();

class EntityStorage {
    [id:number]:Entity;
};

export class EntityManager {
    static _instance: EntityManager = new EntityManager();

    private _storage:EntityStorage = [];

    constructor() {}

    addEntity(name: string, type: AresProtocol.ModifyMessage.ObjectType, socket?:SocketIO.Socket): Entity {
        let new_id = id_generator();
        let new_entity: Entity;

        switch(type) {
            case AresProtocol.ModifyMessage.ObjectType.GAMEOBJECT:
            new_entity = new Entity(new_id, name);
            break;

            case AresProtocol.ModifyMessage.ObjectType.PLAYER:
            new_entity = new Player(new_id, name, socket);
            break;

            case AresProtocol.ModifyMessage.ObjectType.NPC:
            console.error("Not yet implemented");
            break;
        }

        this._storage[new_id] = new_entity;
        return new_entity;
    }
}
