import {Point, Entity} from './entity';

class GameObject extends Entity {
    private _breakable: boolean;
    constructor(id: number, name: string = "", position: Point, collide: boolean = true, speed: number = 0, lifepoint: number, breakable: boolean = true){
        super(id, name, position, collide, speed, lifepoint); // call to the extended class constructor
        this._breakable = breakable;
    }
    set breakable(breakable_: boolean){
        this._breakable = breakable_;
    }
    get breakable(): boolean{
        return this._breakable;
    }
}
