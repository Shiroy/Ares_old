import AresProtocol = require('ares-protocol');

class ReflectorEntry {
    value: string | number | boolean;
    modified: boolean;
}

export class Reflector {
    private _properties: Map<string, ReflectorEntry>;

    constructor() {
        this._properties = new Map();
    }

    setValue(name: string, value: string|number|boolean) {
        this._properties.set(name, {
            value: value,
            modified: true
        });
    }

    getValue(name: string): string|number|boolean {
        if(!this._properties.has(name)){
            return null;
        } else {
            return this._properties[name];
        }
    }

    getPropertiesForCreation(): AresProtocol.ModifyMessage.ReflectorMap {
        let result: AresProtocol.ModifyMessage.ReflectorMap = {};
        for(var [name, value] of this._properties) {
            result[name] = value.value;
        }

        return result;
    }

    getPropertiesForUpdate(): AresProtocol.ModifyMessage.ReflectorMap {
        let result: AresProtocol.ModifyMessage.ReflectorMap = {};

        for(var [name, value] of this._properties) {
            if(value.modified){
                result[name] = value.value;
            }
        }

        return result;
    }

    markAsClean() {
        this._properties.forEach((value) => {
            value.modified = false;
        });
    }
}
