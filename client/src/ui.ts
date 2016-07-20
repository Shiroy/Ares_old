import Phaser = require('phaser');
import {Game} from "./ares";
import {Player} from "./player";

export class ui_manager{
  private _player: Player;
  private _timer: Phaser.Timer;
  private _frequency_in_ms: number;
  constructor(ares: Game, player: Player, frequency_in_ms: number = 500){
    this._player = player;
    this._timer = player.game.time.create();
    this._timer.loop(frequency_in_ms, this.update_all, this);
    this._timer.start();
    this.init_buttons(ares);
  }
  init_buttons(ares: Game){
    for (let i = 0; i < 8; i++){
      let skill_i_signal : Phaser.Signal = new Phaser.Signal();
      skill_i_signal.add(ares.use_spell.bind(ares, i));

      function receive_skill_i_signal(){
        skill_i_signal.dispatch();
      }

      let skill_i = document.getElementById('skill_' + i);
      skill_i.addEventListener('click', receive_skill_i_signal);

      let spell = this._player.spells[i];
      skill_i.innerHTML  = '<strong>' + spell.name + '</strong><br>casttime: ' + spell.castTime/Phaser.Timer.SECOND + '<br>cooldown: ' + spell.coolDownTime/Phaser.Timer.SECOND + '<br>energy: ' + spell.energyCost + '<br>life: ' + spell.lifeCost;
    }
  }
  update_life(){
    document.getElementById('life').style.width = this._player.health / this._player.maxHealth * 100 + '%';
    document.getElementById('life').textContent = this._player.health + '/' + this._player.maxHealth;
  }
  update_energy(){
    document.getElementById('energy').style.width = this._player.energy / this._player.maxEnergy * 100 + '%';
    document.getElementById('energy').textContent = this._player.energy + '/' + this._player.maxEnergy;
  }
  update_spells(){
    for (let i = 0; i < 8; i++){
        if(this._player.game.time.now - this._player.spells[i].last_use < this._player.spells[i].coolDownTime){
          document.getElementById('skill_' + i).classList.remove('spell_available');
          document.getElementById('skill_' + i).classList.add('spell_blocked');
        }
        else{
          document.getElementById('skill_' + i).classList.remove('spell_blocked');
          document.getElementById('skill_' + i).classList.add('spell_available');
        }
    }
  }
  update_target(){
    document.getElementById('target').innerHTML = 'Target:' + this._player.target.name + ' (Life ' + this._player.target.health + '/' + this._player.target.maxHealth + ')';
  }
  update_all(){
    this.update_life();
    this.update_energy();
    this.update_spells();
    this.update_target();
  }
}
