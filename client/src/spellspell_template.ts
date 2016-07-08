class SpellTemplate{
    private _castTime: number;
    private _coolDownTime: number;
    private _energyCost: number;
    private _lifeCost: number;
    constructor(castTime_: number = 0, coolDownTime_: number = 0, energyCost_: number = 0, lifeCost_: number = 0){
        if(castTime_ < 0 || coolDownTime_ < 0 || energyCost_ < 0 || lifeCost_ < 0){
            throw "SpellTemplate initialization error: incorrect parameters";
        }
        this._castTime = castTime_;
        this._coolDownTime = coolDownTime_;
        this._energyCost = energyCost_;
        this._lifeCost = lifeCost_;
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
}
