import {Player} from './player';

export class HumanPlayer extends Player {
    constructor(name: string = "Unknown", speed: number = 1.0, lifepoint: number = 100.0){
        super(name, speed, lifepoint);
    }
}
