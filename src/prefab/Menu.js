class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }

    preload(){
        this.load.image('title', './assets/title.png');
        this.load.audio('start', './assets/start.wav');
    }

    create(){
        
        this.title = this.add.image(240, 320, 'title');
        
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

        let titleConfig = {
            fontFamily: 'Noteworthy',
            fontSize:'15px',
            backgroundColor:'#F3B141',
            color: '#843605',
            align: 'left',
            padding:{
            top: 0,
            bottom: 0,
            left: 130
        },
            fixedWidth: 480
        };

        this.add.text(240, 540, 'use arrow key to control mouse movement', titleConfig).setOrigin(0.5);
        this.add.text(240, 570, 'collect yellow cheese to get points', titleConfig).setOrigin(0.5);
        this.add.text(240, 600, 'avoid green cheese and mouse trap', titleConfig).setOrigin(0.5);
        this.add.text(240, 630, 'green cheese takes points off, trap kills', titleConfig).setOrigin(0.5);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyB)){
            this.sound.play('start');
            this.time.delayedCall(1000, ()=>{this.scene.start('playScene');});
        }
    }

}