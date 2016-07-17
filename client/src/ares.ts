import Phaser = require('phaser');

import {AresMap} from "./phaser_map";
import {Entity} from './entity';
import {Player} from './player';
import {life_printer} from './printer';
import {player_commands} from './player_commands';

import {set_sprite_character_group} from './sprite_functions';

let preload = require('val!../preload_generator.js');


export class Game
{
  private _game: Phaser.Game;

  private _map: AresMap;
  private _player: Player;
  private _player_commands: player_commands;

  private _groups: Map<string, Phaser.Group>;

  private _life_printer: life_printer;

  constructor() {
    this._game = new Phaser.Game(800, 600, Phaser.AUTO, 'Ares', {
      preload: Game.prototype.preload.bind(this),
      create: Game.prototype.create.bind(this),
      update: Game.prototype.update.bind(this),
      render: Game.prototype.render.bind(this),
    });

    this._map = new AresMap(this._game);

    this._groups = new Map<string, Phaser.Group>();
  }

  preload() {
    preload(this._game);
  }

  create() {
    // this._game.physics.startSystem(Phaser.Physics.ARCADE);
    this._game.physics.arcade.skipQuadTree = false;

    this._map.setup();

    // declare a group of players and a group of foes
    this._groups.set("players", this._game.add.physicsGroup());
    this._groups.set("foes", this._game.add.physicsGroup());

    // new player
    this._player = new Player(this._game, 1200, 700, 'img/char_64_64_player.png', 32);
    this._groups.get("players").add(this._player);
    set_sprite_character_group(this._groups.get("players"));
    this._game.camera.follow(this._player);
    this._player_commands = new player_commands(this._player);

    // add some foes
    for (var i = 0; i < 3; i++){
      this._groups.get("foes").create(1200 + Math.random() * 200, 700 + Math.random() * 200, 'img/char_64_64_foe.png', 32);
      this._groups.get("foes").create(1200 + Math.random() * 200, 700 + Math.random() * 200, 'img/char_64_64_skeleton.png', 32);
    }
    set_sprite_character_group(this._groups.get("foes"));

    this._groups.get("foes").forEach(
      (element: Phaser.Sprite) => {
        element.events.onInputDown.add(
          (sprite: Phaser.Sprite) => {
            this._fight(this._player, sprite);
            if(this._player.target == sprite){
              if(this._game.physics.arcade.distanceBetween(this._player, this._player.target) > this._player.scope/2) this._player.following_target = true;
            }
            else{
              this._player.following_target = false;
              this._player.target = sprite;
            }
          },
          this
        );
      },
      this
    );



    this._life_printer = new life_printer(this._game, 15);
    for(let group of this._groups.values()) {
      group.forEach(
        (element: Phaser.Sprite) => {
          this._life_printer.add_sprite(element);
        },
        this
      )
    };
    this._life_printer.start();
  }

  update() {

    for(let group of this._groups.values()) {
      // make every sprites collide
      this._game.physics.arcade.collide(group, this._map.collide_layer());
      for(let group_ of this._groups.values()) {
        this._game.physics.arcade.collide(group, group_);
      }

      // remove inertie
      group.setAll('body.velocity.x', 0);
      group.setAll('body.velocity.y', 0);
    }

    this._player_commands.movements();

    for(let group of this._groups.values()) {
      group.forEach(
        (element: Phaser.Sprite) => {
          if(element.body.velocity.x < 0) element.play('left');
          else if (element.body.velocity.x > 0) element.play('right');
          else if (element.body.velocity.y < 0) element.play('up');
          else if (element.body.velocity.y > 0) element.play('down');
          else if (element.alive) element.animations.stop();
        },
        this
      );
    }
  }

  render(){
    // debugging
    this._game.debug.bodyInfo(this._player, 32, 320);

    this._player.debug_scope();

    this._player.debug_target();
  }


  private _fight(giver: Player, receiver: Phaser.Sprite){
    if(this._game.physics.arcade.distanceBetween(giver, receiver) < giver.scope){
      receiver.damage(15);
    }
  }
  attack(){
    this._fight(this._player, this._player.target);
  }
}
