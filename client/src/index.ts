//Write the client code here
import {Game} from "./ares";
import {init_buttons} from "./ui"

import io = require("socket.io");


io();

let ares : Game = new Game();
init_buttons(ares);
