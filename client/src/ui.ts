import Phaser = require('phaser');
import {Game} from "./ares";

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
