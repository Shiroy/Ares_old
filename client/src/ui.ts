import Phaser = require('phaser');
import {Game} from "./ares";
import {Player} from "./player";

export class ui_manager{
    private _player: Player;
    private _allies: Phaser.Group;
    private _timer: Phaser.Timer;
    private _frequency_in_ms: number;
    constructor(ares: Game, player: Player, frequency_in_ms: number = 500, allies: Phaser.Group){
        this._player = player;
        this._allies = allies;
        this._timer = player.game.time.create();
        this._timer.loop(frequency_in_ms, this.update_all, this);
        this._timer.start();
        this.init_buttons(ares);
    }
    init_buttons(ares: Game){
        for (let i = 0; i < 8; i++){
            let skill_i = document.getElementById('skill_' + i);
            skill_i.addEventListener('click', ares.use_spell.bind(ares, i));

            let spell = this._player.spells[i];
            skill_i.innerHTML  = '<strong>' + spell.name + '</strong><br>casttime: ' + spell.castTime/Phaser.Timer.SECOND + '<br>cooldown: ' + spell.coolDownTime/Phaser.Timer.SECOND + '<br>energy: ' + spell.energyCost + '<br>life: ' + spell.lifeCost;
        }
    }
    // private _create_life_bar(max: number, current: number, type: string){
    //     return '<div class="progress"><div class="progress-bar life" style="width:' + current/max*100 + '%">' + current + "/" + max + '</div></div>';
    // }
    update_life(){
        document.getElementById('player_life').style.width = this._player.health / this._player.maxHealth * 100 + '%';
        document.getElementById('player_life').textContent = this._player.health + '/' + this._player.maxHealth;
    }
    update_energy(){
        document.getElementById('player_energy').style.width = this._player.energy / this._player.maxEnergy * 100 + '%';
        document.getElementById('player_energy').textContent = this._player.energy + '/' + this._player.maxEnergy;
    }

    update_allies(){
        document.getElementById('allies_info').innerHTML = '';
        this._allies.forEach(
            (element: Phaser.Sprite) => {
                let allies_list = "";
                allies_list += "<li class=\"list-group-item\" id=\"selected_allie_" + element.name +"\">" + element.name;
                allies_list += '<div class="progress"><div class="progress-bar life" style="width:' + element.health/element.maxHealth*100 + '%">' + element.health + "/" + element.maxHealth + '</div></div>';
                allies_list += "</li>";

                document.getElementById('allies_info').innerHTML += allies_list;
            },
            this
        );

        this._allies.forEach(
            (element: Phaser.Sprite) => {
                document.getElementById("selected_allie_" + element.name).addEventListener('click', this._player.set_target.bind(this._player, element));
            },
            this
        );
    }
    update_spells(){
        for (let i = 0; i < 8; i++){
            if(this._player.game.time.now - this._player.spells[i].last_use < this._player.spells[i].coolDownTime){
                document.getElementById('skill_' + i).classList.remove('btn-primary');
                document.getElementById('skill_' + i).classList.add('btn-default');
            }
            else{
                document.getElementById('skill_' + i).classList.remove('btn-default');
                document.getElementById('skill_' + i).classList.add('btn-primary');
            }
        }
    }
    update_target(){
        document.getElementById('target_name').innerHTML = this._player.target.name;

        document.getElementById('target_life').style.width = this._player.target.health / this._player.target.maxHealth * 100 + '%';
        document.getElementById('target_life').textContent = this._player.target.health + '/' + this._player.target.maxHealth;
    }
    update_all(){
        this.update_allies();
        this.update_life();
        this.update_energy();
        this.update_spells();
        this.update_target();
    }
}
