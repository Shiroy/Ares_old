import phaser = require('phaser');

// Our Map class name must be different from the javascript containor Map
export class MapClass{
    private _tilemap: phaser.Tilemap;
    private _layers: Map<string, phaser.TilemapLayer>; // [name, layer]
    private _collide_layer_name: string;

    constructor(h: number = 1, w: number = 1){
        if(h <= 0 || w <= 0) throw "map initialization error: incorrect size";

        this._layers = new Map<string, phaser.TilemapLayer>();
    }
    get height(){
        return this._tilemap.height;
    }
    get width(){
        return this._tilemap.width;
    }

    set tilemap(tilemap:phaser.Tilemap){
      if(!tilemap) throw "map: error with the tilemap";
      this._tilemap = tilemap;
    }

    addTilesetImage(tileset_name: string, tileset_file: string){
      if (!this._tilemap) throw "map: adding tileset image not possible without tilemap";
      this._tilemap.addTilesetImage(tileset_name, tileset_file);
    }

    load_layers(layers: Array<string>){
      if (!this._tilemap) throw "map: loading layers not possible without tilemap";
      for (let layer_name of layers){
        this._layers.set(layer_name, this._tilemap.createLayer(layer_name));
      }
    }

    resizeWorld(layer_name: string){
      this._layers.get(layer_name).resizeWorld();
    }

    collide_layer(): phaser.TilemapLayer{
      return this._layers.get(this._collide_layer_name);
    }

    set collide_layer_name(layer_name: string){
      if(!this._layers.get(layer_name)) throw "map : setting collide layer as '" + layer_name + "' not possible. This layer doesn't exist";
      this._collide_layer_name = layer_name;
      this.collide_layer().visible = false;
    }
    get collide_layer_name(){
      return this._collide_layer_name;
    }

    activate_collide_layer(){
      this._tilemap.setCollisionBetween(0, 1024, true, this.collide_layer(), true);
    }

    activate_collide_layer_debug(){
      this.collide_layer().visible = true;
      this.collide_layer().debug = true;
    }
}
