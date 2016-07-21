import phaser = require('phaser');

import {Player} from './player';

export class minimap{
  private _game: Phaser.Game;
  private _player: Player;
  private _graph_background: Phaser.Graphics;
  private _graph_points: Phaser.Graphics
  private _allies: Phaser.Group;
  private _ennemies: Phaser.Group;
  private _factor: number;

  constructor(game: Phaser.Game, player: Player, allies: Phaser.Group, ennemies: Phaser.Group, factor: number = 6){
    this._game = game;
    this._player = player;
    this._allies = allies;
    this._ennemies = ennemies;
    this._factor = factor;

    this._graph_points = this._game.add.graphics(10, 10);
    this._graph_background = this._game.add.graphics(10, 10);
    this._graph_points.fixedToCamera = true;
    this._graph_background.fixedToCamera = true;

    this._graph_background.beginFill(0xFFFFFF, 0.5);
    this._graph_background.drawRect(0, 0, this._game.world.width / 64 * this._factor, this._game.world.height / 64 * this._factor);
  }

  update(){
    this._graph_points.clear();
    this._game.world.bringToTop(this._graph_points);

    // scope
    this._graph_points.beginFill(0x00FFFF, 0.2);
    this._graph_points.drawCircle(this._player.position.x / 64 * this._factor, this._player.position.y / 64 * this._factor, 2 * this._player.scope / 64 * this._factor);

    // player position
    this._graph_points.beginFill(0x0000FF, 0.6);
    this._graph_points.drawCircle(this._player.position.x / 64 * this._factor, this._player.position.y / 64 * this._factor, 5);

    // ennemies
    this._graph_points.beginFill(0xFF0000, 0.6);
    this._ennemies.forEach(
      (element: Phaser.Sprite) => {
        this._graph_points.drawCircle(element.position.x / 64 * this._factor, element.position.y / 64 * this._factor, 5);
      },
      this
    );
    // allies
    this._graph_points.beginFill(0x00FF00, 0.6);
    this._allies.forEach(
      (element: Phaser.Sprite) => {
        if (element != this._player) this._graph_points.drawCircle(element.position.x / 64 * this._factor, element.position.y / 64 * this._factor, 5);
      },
      this
    );
  }
}
