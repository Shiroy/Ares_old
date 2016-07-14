import Phaser = require('phaser');

export class Entity extends Phaser.Sprite{
  constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame: string | number, maxHealth: number = 100){
    // call to the Phaser.Sprite constructor
    super(game, x, y, key, frame);

    this.maxHealth = maxHealth;
    this.heal(maxHealth);
  }
}
