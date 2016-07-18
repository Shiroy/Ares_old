import Phaser = require('phaser');
import {Game} from "./ares";
import {Player} from "./player";

export function init_buttons(ares: Game){
  for (let i = 0; i < 8; i++){
    let skill_i_signal : Phaser.Signal = new Phaser.Signal();
    skill_i_signal.add(ares.use_spell.bind(ares, i));

    function receive_skill_i_signal(){
      skill_i_signal.dispatch();
    }

    let skill_i = document.getElementById('skill_' + i);
    skill_i.addEventListener('click', receive_skill_i_signal);
  }
}
export class ui_manager{
  private _player: Player;
  private _timer: Phaser.Timer;
  private _frequency_in_ms: number;
  constructor(player: Player, frequency_in_ms: number = 500){
    this._player = player;
    this._timer = player.game.time.create();
    this._timer.loop(frequency_in_ms, this.update_all, this);
    this._timer.start();
  }
  update_life(){
    document.getElementById('life').style.width = this._player.health / this._player.maxHealth * 100 + '%';
    document.getElementById('life').textContent = this._player.health + '/' + this._player.maxHealth;
  }
  update_energy(){
    document.getElementById('energy').style.width = this._player.energy / this._player.maxEnergy * 100 + '%';
    document.getElementById('energy').textContent = this._player.energy + '/' + this._player.maxEnergy;
  }
  update_all(){
    this.update_life();
    this.update_energy();
  }
}
