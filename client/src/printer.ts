import Phaser = require('phaser');
import {ares_exception} from "./exception";

export class life_printer{
  private _game: Phaser.Game;
  private _sprites: Array<Phaser.Sprite>;
  private _timer: Phaser.Timer;
  private _frequency_in_ms: number;

  constructor(game: Phaser.Game, frequency_in_ms: number = 100){
    this._game = game;

    this._sprites = new Array<Phaser.Sprite>();

    this._frequency_in_ms = frequency_in_ms;

    this._timer = this._game.time.create();
    this._timer.loop(frequency_in_ms, this.print_lifes, this);
  }
  start(){
    this._timer.start();
  }
  stop(){
    this._timer.stop();
  }
  add_sprite(sprite: Phaser.Sprite){
    this._sprites.push(sprite);
  }
  print_lifes(){
      for (let sprite of this._sprites){
        if(sprite.alive){
          let text = this._game.add.text(0, 0, sprite.health.toString(), { font: "3em;", fill: "#f99b10", align: "" });
          text.alignTo(sprite, Phaser.TOP_CENTER, 0, -15);
          text.lifespan = this._frequency_in_ms - 1;
        }
      }
  }
}
