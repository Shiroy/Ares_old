export class Map{
    private _height: number;
    private _width: number;
    constructor(h: number, w: number){
        if(h <= 0 || w <= 0) throw "map initialization error: incorrect size";
        this._height = h;
        this._width = w;
    }
    set height(h: number) {
        if(h < 0) throw "map error: negative height";
        this._height = h;
    }
    set width(w: number) {
        if(w < 0) throw "map error: negative width";
        this._width = w;
    }
    get height(){
        return this.height;
    }
    get width(){
        return this.width;
    }
}
