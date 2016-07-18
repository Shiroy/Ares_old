import Phaser = require('phaser');
import {Player} from './player';

export class player_commands{
  private _cursors: Phaser.CursorKeys;
  private _player: Player;

  constructor(player: Player){
    this._player = player;
    this._cursors = player.game.input.keyboard.createCursorKeys();
  }

  movements(){
    if (this._cursors.left.isDown)
    {
      this._player.body.velocity.x = -this._player.maxSpeed;
    }
    if (this._cursors.right.isDown)
    {
      this._player.body.velocity.x = this._player.maxSpeed;
    }
    if (this._cursors.up.isDown)
    {
      this._player.body.velocity.y = -this._player.maxSpeed;
    }
    if (this._cursors.down.isDown)
    {
      this._player.body.velocity.y = this._player.maxSpeed;
    }

    if(this._player.using_spell){
      this._player.body.velocity.x = 0;
      this._player.body.velocity.y = 0;
    }

    if(this._cursors.up.isUp && this._cursors.down.isUp && this._cursors.right.isUp && this._cursors.left.isUp){
      if(this._player.following_target){
        if(this._player.game.physics.arcade.distanceBetween(this._player, this._player.target) < this._player.scope/2) this._player.following_target = false;

        if(this._player.position.x > this._player.target.position.x) this._player.body.velocity.x = -this._player.maxSpeed;
        if(this._player.position.x < this._player.target.position.x) this._player.body.velocity.x = this._player.maxSpeed;
        if(this._player.position.y > this._player.target.position.y) this._player.body.velocity.y = -this._player.maxSpeed;
        if(this._player.position.y < this._player.target.position.y) this._player.body.velocity.y = this._player.maxSpeed;
      }
    }
    else this._player.following_target = false;

    if(Math.abs(this._player.body.velocity.x) + Math.abs(this._player.body.velocity.y)>this._player.maxSpeed){
      this._player.body.velocity.x = this._player.body.velocity.x / Math.sqrt(2);
      this._player.body.velocity.y = this._player.body.velocity.y / Math.sqrt(2)
    }
  }

}
