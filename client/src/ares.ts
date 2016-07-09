import {Map} from "./map";
import {HumanPlayer} from './human_player';
import {Entity_Manager} from './entity_manager';
let preload = require('val!../../preload_generator.js');

export class Game
{
    constructor() {
        this._map = new Map(32, 32);
    }

    preLoad() {
        preload();
    }

    create() {
        this._player = new HumanPlayer("Joueur 1");
        Entity_Manager.getInstance().addEntity(this._player);
    }

    update() {

    }

    get map() {
        return this._map;
    }

    private _map : Map;
    private _player : HumanPlayer;
}
