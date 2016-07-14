import {Entity} from './entity';

export class Player extends Entity{
  private _scope: number;
  private _maxSpeed: number;

  private _target: Phaser.Sprite;
  private _following_target: boolean;

  constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame: string | number, scope: number = 230, maxHealth: number = 100, maxSpeed: number = 300){
    // call to the Phaser.Sprite constructor
    super(game, x, y, key, frame, maxHealth);

    this._scope = scope;
    this._maxSpeed = maxSpeed;

    this._target = this;
    this._following_target = false;
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
  get target(){
    return this._target;
  }
  set target(sprite: Phaser.Sprite){
    this._target = sprite;
  }
  get following_target(){
    return this._following_target;
  }
  set following_target(following_target: boolean){
    this._following_target = following_target;
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
