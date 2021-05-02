/*
    Collabrator Chuanyu Xiao, Huang Can, Minghui Ye
    game title : Mouse Runner
    date completed : 05/01/2021
    Creative Tilt : 

        - the art style was appraised among the group member
        
        - I have implememented game in a way as if there were 5 invisible track on the
            tile sprite, which is going to be easy for player to move the mouse and catch
            the cheese/trap.
*/

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