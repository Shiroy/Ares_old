import Phaser = require('phaser');

export class Entity extends Phaser.Sprite{
  private _scope: number;
  private _speed: number;

  constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame: string | number, scope: number = 230, health: number = 100, speed: number = 300){
    // call to the Phaser.Sprite constructor
    super(game, x, y, key, frame);

    this._scope = scope;
    this._speed = speed;
    this.heal(health);
  }
  get scope(){
    return this._scope;
  }
  set scope(scope: number){
    this._scope = scope;
  }
  get speed(){
    return this._speed;
  }
  set speed(speed: number){
    this._speed = speed;
  }

  debug_scope(): Phaser.Graphics{
    var graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(0xFF0000, 0.1);
    graphics.drawCircle(this.x, this.y, this.scope + Math.max(this.width, this.height)*2 + 100);
    return graphics;
  }
}
