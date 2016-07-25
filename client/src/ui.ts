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
            let skill_i = $('#skill_' + i);
            skill_i.click(ares.use_spell.bind(ares, i));

            let spell = this._player.spells[i];
            skill_i.html('<strong>' + spell.name + '</strong><br>casttime: ' + spell.castTime/Phaser.Timer.SECOND + '<br>cooldown: ' + spell.coolDownTime/Phaser.Timer.SECOND + '<br>energy: ' + spell.energyCost + '<br>life: ' + spell.lifeCost);
        }
    }
    private _create_life_bar(max: number, current: number, type: string = ''){
        return '<div class="progress"><div class="progress-bar life" style="width:' + current/max*100 + '%">' + current + "/" + max + '</div></div>';
    }
    update_life(){
        $('#player_life').width(this._player.health / this._player.maxHealth * 100 + '%');
        $('#player_life').text(this._player.health + '/' + this._player.maxHealth);
    }
    update_energy(){
        $('#player_energy').width(this._player.energy / this._player.maxEnergy * 100 + '%');
        $('#player_energy').text(this._player.energy + '/' + this._player.maxEnergy);
    }

    update_allies(){
        $('#allies_info').empty();
        let allies_list = "";
        this._allies.forEach(
            (element: Phaser.Sprite) => {
                allies_list += "<button class=\"btn btn-primary\" id=\"ally_" + element.name +"\">" + element.name;
                allies_list += this._create_life_bar(element.maxHealth, element.health);
                allies_list += "</button>";
            },
            this
        );
        $('#allies_info').html(allies_list);

        this._allies.forEach(
            (element: Phaser.Sprite) => {
                $("#ally_" + element.name).click(this._player.set_target.bind(this._player, element));
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
        $('#target_name').text(this._player.target.name);

        $('#target_life').width(this._player.target.health / this._player.target.maxHealth * 100 + '%');
        $('#target_life').text(this._player.target.health + '/' + this._player.target.maxHealth);
    }
    update_all(){
        this.update_allies();
        this.update_life();
        this.update_energy();
        this.update_spells();
        this.update_target();
    }
}
