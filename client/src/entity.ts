import phaser = require('phaser');

export class Point {
    x: number;
    y: number;

    move(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }
}

export abstract class Entity {
    private _id: number;//unique identifier of an Entity
    private _name: string;

    private _position: Point;
    private _collide: boolean;
    private _speed: number;
    private _lifepoint: number;

    private _sprite: phaser.Sprite;

    constructor(id: number = null, name: string = "", position: Point = new Point(), collide: boolean = true, speed: number = 0, lifepoint: number = 1){
        if(speed < 0 || lifepoint < 0) throw "Entity initialization error: incorrect parameters";

        this._id = id;
        this._name = name;

        this._position = position;
        this._collide = collide;
        this._speed = speed;
        this._lifepoint = lifepoint;
    }

    set name(name_: string){
        this._name = name;
    }
    set position(position: Point){
        this._position = position;
    }
    set collide(collide: boolean){
        this._collide = collide;
    }
    set speed(speed: number){
        if(speed < 0) throw "Entity error: negative speed";
        this._speed = speed;
    }
    set lifepoint(lifepoint: number) {
        if(lifepoint < 0) throw "Entity error: negative lifepoint";
        this._lifepoint = lifepoint;
    }

    get id(){
        return this._id;
    }

    set id(id: number) {
        if(this._id){
            throw "Entity error : id already set";
        }

        this._id = id;
    }
    set sprite(sprite: phaser.Sprite){
      this._sprite = sprite;
    }

    get name(){
        return this._name;
    }
    get position(){
        return this._position;
    }
    get collide(){
        return this._collide;
    }
    get speed(){
        return this._speed;
    }
    get lifepoint(){
        return this._lifepoint;
    }
    get sprite(): phaser.Sprite{
      return this._sprite;
    }
}
