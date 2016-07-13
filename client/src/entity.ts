import Phaser = require('phaser');

export class Entity extends Phaser.Sprite{
  private _scope: number;
  private _maxSpeed: number;

  constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame: string | number, scope: number = 230, maxHealth: number = 100, maxSpeed: number = 300){
    // call to the Phaser.Sprite constructor
    super(game, x, y, key, frame);

    this.maxHealth = maxHealth;
    this.heal(maxHealth);

    this._scope = scope;
    this._maxSpeed = maxSpeed;
  }
  get scope(){
    return this._scope;
  }
  set scope(scope: number){
    this._scope = scope;
  }
  get maxSpeed(){
    return this._maxSpeed;
  }
  set maxSpeed(maxSpeed: number){
    this._maxSpeed = maxSpeed;
  }

  debug_scope(): Phaser.Graphics{
    var graphics = this.game.add.graphics(0, 0);
    graphics.beginFill(0xFF0000, 0.1);
    graphics.drawCircle(this.x, this.y, 2*this.scope);
    graphics.beginFill(0x0000FF, 0.4);
    graphics.drawCircle(this.x, this.y, 10);
    return graphics;
  }
}
