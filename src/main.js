let config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { x : 0, y: 0 }
        }
    },
    scene: [Menu, Play]
};

let game = new Phaser.Game(config);

let borderX = game.config.width;
let borderY = game.config.height;

let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyB, keyR;