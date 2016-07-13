import {MapClass} from "./map";

import Phaser = require('phaser');

export class AresMap extends MapClass{
  private _game: Phaser.Game;

  constructor(game: Phaser.Game){
    super();

    this._game = game;
  }
  setup(){
    this.tilemap = this._game.add.tilemap('map/simple.json.map');

    this.addTilesetImage('terrain', 'img/terrain.png');

    this.load_layers(['water_sand', 'grass', 'collide']); // layer stack order expected

    this.resizeWorld('water_sand');//Sets the world size to match the layer size

    this.collide_layer_name = 'collide';

    this.activate_collide_layer();

    this.activate_collide_layer_debug();
  }
}
