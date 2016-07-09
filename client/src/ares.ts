import {MapClass} from "./map";
import {HumanPlayer} from './human_player';
import {Entity_Manager} from './entity_manager';

let preload = require('val!../../preload_generator.js');
import phaser = require('phaser');

export class Game
{
  private _game: phaser.Game;

  private _map : MapClass;
  private _player : HumanPlayer;

  private _cursors: phaser.CursorKeys;

  constructor() {
    this._game = new Phaser.Game(800, 600, Phaser.AUTO, 'Ares', {

      preload: Game.prototype.preload.bind(this),
      create: Game.prototype.create.bind(this),
      update: Game.prototype.update.bind(this),
      render: Game.prototype.render.bind(this),
    });

    this._map = new MapClass(32, 32);
  }

  preload() {
    this._game.load.spritesheet('img/char_64_64_player.png', 'img/char_64_64_player.png', 64, 64);
    this._game.load.image('img/terrain.png', 'img/terrain.png');
    this._game.load.tilemap('map/map_v1.json.map', 'map/map_v1.json.map', null, Phaser.Tilemap.TILED_JSON);
    //preload(this._game);
  }

  create() {
      // this._game.physics.startSystem(Phaser.Physics.ARCADE);
      // this._game.physics.arcade.skipQuadTree = false;

      this._map_setup();

      this._player_setup();
      Entity_Manager.getInstance().addEntity(this._player);

      this._game.camera.follow(this._player.sprite);

      this._cursors = this._game.input.keyboard.createCursorKeys();
  }

  update() {
    // make the player collide with the points of the collide layer
    this._game.physics.arcade.collide(this._player.sprite, this._map.collide_layer());

    this._player.sprite.body.velocity.set(0);

    if (this._cursors.left.isDown)
    {
      this._player.sprite.body.velocity.x = -300;
      this._player.sprite.play('left');
    }
    else if (this._cursors.right.isDown)
    {
      this._player.sprite.body.velocity.x = 300;
      this._player.sprite.play('right');
    }
    else if (this._cursors.up.isDown)
    {
      this._player.sprite.body.velocity.y = -300;
      this._player.sprite.play('up');
    }
    else if (this._cursors.down.isDown)
    {
      this._player.sprite.body.velocity.y = 300;
      this._player.sprite.play('down');
    }
    else
    {
      this._player.sprite.animations.stop();
    }
  }

  render(){
    this._game.debug.body(this._player.sprite);
    this._game.debug.bodyInfo(this._player.sprite, 32, 320);
  }

  private _map_setup(){
    this._map.tilemap = this._game.add.tilemap('map/map_v1.json.map');

    this._map.addTilesetImage('terrain', 'img/terrain.png');

    this._map.load_layers(['water', 'sand', 'ground', 'grass', 'rocks', 'collide']); // layer stack order expected

    this._map.resizeWorld('water');//Sets the world size to match the layer size

    this._map.collide_layer_name = 'collide';

    this._map.activate_collide_layer();

    this._map.activate_collide_layer_debug();
  }
  private _player_setup(){
    this._player = new HumanPlayer("Joueur 1");

    this._player.sprite = this._game.add.sprite(400, 400, 'img/char_64_64_player.png', 32);

    this._game.physics.enable(this._player.sprite, Phaser.Physics.ARCADE);

    this._player.sprite.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 20, true);
    this._player.sprite.animations.add('right', [143,144,145,146,147,148,149,150,151], 20, true);
    this._player.sprite.animations.add('up', [104, 105, 106, 107, 108, 109, 110, 111, 112], 20, true);
    this._player.sprite.animations.add('down', [130,131,132,133,134,135,136,137,138], 20, true);

    this._player.sprite.body.setSize(25, 13, 20, 49);

    // make the player collide with the edges
    this._player.sprite.body.collideWorldBounds = true;
  }

  // get map() {
  //     return this._map;
  // }
}
