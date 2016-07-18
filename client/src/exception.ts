export class ares_exception {
  private _class: string;
  private _method: string;
  private _error: string;

  constructor(class_: string = "general", method_: string = "function", error_: string = "error"){
    this._class = class_;
    this._method = method_;
    this._error = error_;
  }

  get class_(){
    return this._class;
  }
  get method_(){
    return this._method;
  }
  get error_(){
    return this._error;
  }

  print(): string{
    return "'" + this._class + "' error, function '" + this._method + "': " + this._error;
  }
}
