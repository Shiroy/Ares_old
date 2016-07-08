import {Point, Entity} from './entity';

let new_id = (function() {
    let next_id = 0;

    return function(){
        next_id++;
        return next_id;
    }
})();

export class Entity_Manager{
    private static instance : Entity_Manager = new Entity_Manager();
    private _entities: Map<number, Entity>;

    /*
    add an new entity with the key 'id' in the manager map
    return the entity inserted in the map
    */
    private _addEntity(newEntity: Entity, id: number){
        newEntity.id = id;
        this._entities.set(id, newEntity);
        return this._entities[id];
    }

    // public method for adding new entity
    addEntity(newEntity: Entity){
        return this._addEntity(newEntity, new_id());
    }

    removeEntity(id: number){
        this._entities.delete(id);
    }
    clear(){
        this._entities.clear();
    }
    findEntity(id: number): Entity{
        return this._entities.get(id);
    }
    findEntitiesOnPosition(position: Point){
        let entitiesOnThisPosition = [];
        this._entities.forEach(function(entity, id) {
            if (entity.position == position){
                //add this Entity to the list
                entitiesOnThisPosition.push(entity);
            }
        }, this._entities);
        /*
        //following code only available with ES6
        for (let value in this._entities.values) {
        if (value.position == position){
        //add this Entity to the list
    }
}
*/
        return entitiesOnThisPosition;
    }
    get number_entities(): number{
        return this._entities.size;
    }

    //Returns a new Iterator object that contains the values for each entity in the Map object in insertion order.
    get entities(){
        return this._entities.values;
    }

    static getInstance() {
        return Entity_Manager.instance;
    }
}
