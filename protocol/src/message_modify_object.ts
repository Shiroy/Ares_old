import {Position} from './position';

export enum Action {
    CREATE = 1,
    UPDATE = 2,
    DELETE = 3
};

export enum ObjectType {
    NPC = 1,
    PLAYER = 2,
    GAMEOBJECT = 3
};

export class ReflectorMap {
    [name:string]: string|number|boolean;
}

export class MessageModifyObject {
    id: number;
    action: Action;
    data: CreatePart | UpdatePart | DeletePart;
}

export class CreatePart {
    myself: boolean;
    position: Position;
    type: ObjectType;
    properties: ReflectorMap;
};

export class UpdatePart {
    properties: ReflectorMap;
};

export class DeletePart {

};

/*
Liste de properties

health
maxHealth
healthRegenRate
power
maxPower
powerRegenRate
sprite
animation
scope
speed

*/
