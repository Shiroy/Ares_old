import {ares_exception} from "./exception";
import {Entity} from "./entity";

export class Entity_Manager {
  private static _instance: Entity_Manager = new Entity_Manager();
  private _entities: Array<Entity>;

  constructor(){
    if (Entity_Manager._instance) throw new ares_exception("Entity_Manager", "constructor", "instantiation failed, use getInstance instead");
    this._entities = new Array<Entity>();
    Entity_Manager._instance = this;
  }
  static getInstance(): Entity_Manager{
    return Entity_Manager._instance;
  }

  add_entity(entity: Entity){
    if(!entity) throw new ares_exception("Entity_Manager", "add_entity", "entity null");
    this._entities.push(entity);
  }
}
