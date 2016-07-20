import Phaser = require('phaser');

import {AresMap} from "./phaser_map";
import {minimap} from "./minimap";
import {Entity} from './entity';
import {Player} from './player';
import {life_printer} from './printer';
import {player_commands} from './player_commands';
import {spell, spell_attack, spell_explosion} from './spell';

import {set_sprite_character_group} from './sprite_functions';

import {ui_manager} from './ui';

let preload = require('val!../preload_generator.js');


export class Game
{
  private _game: Phaser.Game;

  private _map: AresMap;
  private _minimap: minimap;
  private _player: Player;
  private _player_commands: player_commands;

  private _groups: Map<string, Phaser.Group>;

  private _life_printer: life_printer;

  private _ui_manager: ui_manager;

  constructor() {
    this._game = new Phaser.Game(window.innerWidth - 100, 500, Phaser.AUTO, 'ares', {
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

    // declare a group of allies and a group of ennemies
    this._groups.set("allies", this._game.add.physicsGroup());
    this._groups.set("ennemies", this._game.add.physicsGroup());

    let spellset : spell[] = new Array<spell>();
    for (let i = 0; i < 7; i++) spellset.push(new spell_attack());
    spellset.push(new spell_explosion());

    // new player
    this._player = new Player('Brutor', this._game, 1200, 700, 'img/char_64_64_player.png', 32, spellset);
    this._groups.get("allies").add(this._player);

    this._player_commands = new player_commands(this._player);

    // add an allie
    this._groups.get("allies").add(new Entity('Alexia', this._game, 1200 + Math.random() * 200, 700 + Math.random() * 200, 'img/char_64_64_player_female.png', 32));

    // add some ennemies
    for (var i = 0; i < 3; i++){
      let foe = new Entity('Foe'+i, this._game, 1200 + Math.random() * 200, 700 + Math.random() * 200, 'img/char_64_64_foe.png', 32)
      this._groups.get("ennemies").add(foe);
      let foe2 = new Entity('Skeleton'+i, this._game, 1200 + Math.random() * 200, 700 + Math.random() * 200, 'img/char_64_64_skeleton.png', 32);
      this._groups.get("ennemies").add(foe2);
    }

    set_sprite_character_group(this._groups.get("allies"));
    set_sprite_character_group(this._groups.get("ennemies"));

    this._groups.get("ennemies").forEach(
      (element: Phaser.Sprite) => {
        this._game.physics.arcade.quadTree.insert(element.body);
        element.events.onInputDown.add(
          (sprite: Phaser.Sprite) => {
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

    this._ui_manager = new ui_manager(this, this._player, 500, this._groups.get('allies'));

    this._minimap = new minimap(this._game, this._player, this._groups.get('allies'), this._groups.get('ennemies'));
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
          else if (element.alive && element.animations.name != 'spell') element.animations.stop();
        },
        this
      );
    }

    this._minimap.update();
  }

  render(){
    // debugging
    // this._game.debug.bodyInfo(this._player, 32, 320);

    // this._player.debug_scope();

    this._player.debug_target();

    // this._game.debug.quadTree(this._game.physics.arcade.quadTree, 'black');


  }

  use_spell(i: number){
      this._player.apply_spell(i);
  }
}
