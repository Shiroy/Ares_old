import Phaser = require('phaser');
import {Player} from './player';


export abstract class spell{
  private _name: string;
  private _castTime: number;
  private _coolDownTime: number;
  private _energyCost: number;
  private _lifeCost: number;
  protected _last_use: number;
  constructor(name: string = 'spell_name', castTime_: number = 0, coolDownTime_: number = 0, energyCost_: number = 0, lifeCost_: number = 0){
    if(castTime_ < 0 || coolDownTime_ < 0 || energyCost_ < 0 || lifeCost_ < 0){
      throw "SpellTemplate initialization error: incorrect parameters";
    }
    this._name = name;
    this._castTime = castTime_;
    this._coolDownTime = coolDownTime_;
    this._energyCost = energyCost_;
    this._lifeCost = lifeCost_;

    this._last_use = -coolDownTime_;
  }
  apply(player: Player){
    if(player.game.physics.arcade.distanceBetween(player, player.target) < player.scope){
      if(!player.using_spell && player.energy >= this.energyCost && player.game.time.now - this._last_use > this._coolDownTime){
        player.energy -= this.energyCost;
        let timer = player.game.time.create();
        timer.add(this.castTime, this._effects.bind(this, player));
        player.using_spell = true;
        timer.start();
        player.play('spell');
      }
    }
  }
  protected abstract _effects(player: Player);
  set name(name: string){
    this._name = name;
  }
  set castTime(castTime_: number){
    if (castTime_ < 0) throw "SpellTemplate: incorrect castTime";
    this._castTime = castTime_;
  }
  set coolDownTime(coolDownTime_: number){
    if (coolDownTime_ < 0) throw "SpellTemplate: incorrect coolDownTime";
    this._coolDownTime = coolDownTime_;
  }
  set energyCost(energyCost_: number){
    if (energyCost_ < 0) throw "SpellTemplate: incorrect castTime";
    this._energyCost = energyCost_;
  }
  set lifeCost(lifeCost_: number){
    if (lifeCost_ < 0) throw "SpellTemplate: incorrect lifeCost";
    this._lifeCost = lifeCost_;
  }
  get name(){
    return this._name;
  }
  get castTime(){
    return this._castTime;
  }
  get coolDownTime(){
    return this._coolDownTime;
  }
  get energyCost(){
    return this._energyCost;
  }
  get lifeCost(){
    return this._lifeCost;
  }
  get last_use(){
    return this._last_use;
  }
}

export class spell_attack extends spell{
  constructor(){
    super('Attack', 800, 5*Phaser.Timer.SECOND, 5);
  }
  _effects(player: Player){
    player.target.damage(15);
    this._last_use = player.game.time.now;
    player.animations.stop();
    player.using_spell = false;
  }
}
export class spell_explosion extends spell{
  marker: Phaser.Rectangle;
  constructor(){
    super('Meteor', 2*Phaser.Timer.SECOND, 10*Phaser.Timer.SECOND, 15);
  }
  _effects(player: Player){
    let radius = 500;
    this.marker = new Phaser.Rectangle(player.target.position.x - radius/2, player.target.position.y - radius/2, radius, radius);

    let founds = player.game.physics.arcade.quadTree.retrieve(this.marker); // doesn't work, returning every sprites

    for (let found of founds)
    {
      if(player.game.physics.arcade.distanceBetween(player.target, found.sprite) < 100){
        found.sprite.damage(20);
      }
    }

    this._last_use = player.game.time.now;
    player.animations.stop();
    player.using_spell = false;
  }
}
