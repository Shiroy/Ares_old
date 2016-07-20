import Phaser = require('phaser');

export class Entity extends Phaser.Sprite{
  constructor(
    name: string = 'Entity',
    game: Phaser.Game,
    x: number, y: number,
    key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture,
    frame: string | number,
    maxHealth: number = 500
  ){
    // call to the Phaser.Sprite constructor
    super(game, x, y, key, frame);

    this.name = name;

    this.maxHealth = maxHealth;
    this.heal(maxHealth);
  }
}
