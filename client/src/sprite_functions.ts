import Phaser = require('phaser');

function set_sprite_character_animations(sprite: Phaser.Sprite){
  sprite.animations.add('left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 20, true);
  sprite.animations.add('right', [143,144,145,146,147,148,149,150,151], 20, true);
  sprite.animations.add('up', [104, 105, 106, 107, 108, 109, 110, 111, 112], 20, true);
  sprite.animations.add('down', [130,131,132,133,134,135,136,137,138], 20, true);
  sprite.animations.add('down', [130,131,132,133,134,135,136,137,138], 20, true);

  sprite.animations.add('death', [260, 261, 262, 263, 264, 265], 5, false);

  sprite.events.onKilled.add(
    (this_sprite: Phaser.Sprite) => {
      this_sprite.exists = true;
      this_sprite.play('death');
    }
  );
}

export function set_sprite_character_group(char_group: Phaser.Group){
  char_group.enableBody = true;

  char_group.forEach(
    (element: Phaser.Sprite) => {
      set_sprite_character_animations(element);
      element.body.setSize(25, 13, 20, 49);
    },
    this
  );

  char_group.physicsBodyType = Phaser.Physics.ARCADE;

  char_group.setAll('body.collideWorldBounds', true);
  char_group.setAll('anchor.x', 0.5);
  char_group.setAll('anchor.y', 0.5);
  char_group.setAll('inputEnabled', true)

  char_group.setAll('health', 100);
}
