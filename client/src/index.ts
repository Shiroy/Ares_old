//Write the client code here
import phaser = require('phaser');
import {Game} from "./ares";

let ares : Game = new Game();
let game = new Phaser.Game(1024, 768, Phaser.AUTO, {preload: ares.preLoad.bind(ares), create: ares.preLoad.bind(ares), update: ares.update.bind(ares)});
