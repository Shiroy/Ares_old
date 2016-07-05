import {Entity, Point} from './entity';
import {Energy} from './energy';

export class Player extends Entity {
    private _energies: number[];

    constructor(name: string = "Unknown", speed = 1.0, lifepoint: number) {
        super(null, name, new Point(), false, speed, lifepoint);
    }

    setEnergy(type: Energy, value: number) {
        if(value < 0){
            value = 0;
        }
        this._energies[type] = value;
    }

    getEnergy(type: Energy) : number {
        return this._energies[type];
    }

    modifyEnergy(type: Energy, delta: number) {
        let value = this.getEnergy(type);
        value += delta;
        this.setEnergy(type, value);
    }
}
