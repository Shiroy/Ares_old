import {Entity} from './entity';
import {spell} from './spell'
import {ares_exception} from './exception';

export class Player extends Entity{
  private _spells: Array<spell>;

  private _scope: number;
  private _maxSpeed: number;

  private _energy: number;
  private _maxEnergy: number;

  private _using_spell: boolean;

  private _target: Phaser.Sprite;
  private _following_target: boolean;

  private _graphic_scope: Phaser.Graphics;

  constructor(game: Phaser.Game,
    x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
    frame: string | number,
    spells: Array<spell>,
    scope: number = 230,
    maxHealth: number = 500,
    maxSpeed: number = 300,
    maxEnergy: number = 60){

    // call to the Phaser.Sprite constructor
    super(game, x, y, key, frame, maxHealth);
    if(spells.length > 8) new ares_exception('Player', 'constructor', 'too many spells');
    this._spells = spells;
    for (let i = 0; i < spells.length; i++){
      document.getElementById('skill_' + i).textContent = spells[i].name;
    }

    this._scope = scope;
    this._maxSpeed = maxSpeed;

    this._maxEnergy = maxEnergy;
    this._energy = maxEnergy;

    this._target = this;
    this._following_target = false;

    this._graphic_scope = this.game.add.graphics(0, 0);
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
  get maxEnergy(){
    return this._maxEnergy;
  }
  set maxEnergy(maxEnergy: number){
    this._maxEnergy = maxEnergy;
  }
  get energy(){
    return this._energy;
  }
  set energy(energy: number){
    this._energy = energy;
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
  get using_spell(){
    return this._using_spell;
  }
  set using_spell(using_spell: boolean){
    this._using_spell = using_spell;
  }

  apply_spell(i: number){
    if(!this._spells[i]) throw new ares_exception('Player', 'apply_spell', 'the spell ' + i + ' doesn\'t exists');
    this._spells[i].apply(this);
  }

  debug_scope(): Phaser.Graphics{
    this._graphic_scope.clear();
    this._graphic_scope.beginFill(0xFF0000, 0.1);
    this._graphic_scope.drawCircle(this.x, this.y, 2*this.scope);
    this._graphic_scope.beginFill(0x0000FF, 0.4);
    this._graphic_scope.drawCircle(this.x, this.y, 10);
    return this._graphic_scope;
  }
  debug_target(){
    let color: string;
    if(this.game.physics.arcade.distanceBetween(this, this._target) < this._scope) color = 'green';
    else color = 'red';
    this.game.debug.spriteBounds(this._target, color, false);
  }
}
