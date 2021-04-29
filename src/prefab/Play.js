class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    //preload asset for the game

    preload(){
        
        this.load.image('ship', './assets/spaceship.png');
        this.load.image('main', './assets/main.png');
        this.load.image('background', './assets/background.png');
        this.load.image('mouse1', './assets/Mouse.png');
        this.load.image('floor', './assets/background.png');
        this.load.image('badCheese', './assets/badCheese.png');
        this.load.image('goodCheese', './assets/goodCheese.png');
        this.load.image('trap', './assets/ratTrap.png');
        this.load.image('lol', './assets/lol.png');
        
        this.load.audio('hitGoodCheese', './assets/hitGoodCheese.wav');
        this.load.audio('hitBadCheese', './assets/hitBadCheese.wav');
        this.load.audio('trapSlap', './assets/trapSlap.wav');
        this.load.audio('background', './assets/background.wav');
        this.load.audio('gameover', './assets/gameover.wav');

        this.load.spritesheet('bloom1', './assets/bloom1.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 5
        });

        this.load.spritesheet('mouse', './assets/walking.png',{
            frameWidth: 48,
            frameHeight: 84,
            startFrame: 0,
            endFrame: 15,
            repeat: -1
        });

    }

    create(){
        this.score = 0;
        this.speedUp = false;
        let titleConfig = {
            fontFamily: 'Noteworthy',
            fontSize:'15px',
            backgroundColor:'#F3B141',
            color: '#843605',
            align: 'left',
            padding:{
            top: 0,
            bottom: 0,
            left: 30
        },
            fixedWidth: 100
        };

        this.scoreConfig = {
            fontFamily: 'Noteworthy',
            fontSize:'30px',
            backgroundColor:'#F3B141',
            color: '#843605',
            align: 'left',
            padding:{
            top: 0,
            bottom: 0,
            left: 30
        },
            fixedWidth: 110
        };

       

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.anims.create({
            key: 'bloom1',
            frames: this.anims.generateFrameNumbers('bloom1', { start: 0, end: 5, first: 0}),
            frameRate: 30
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('mouse', { start: 0, end: 15, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        
        this.floor = this.add.tileSprite(0, 0, 480, 640, 'background').setOrigin(0,0);
        
        //this.main = new Mouse(this, 240, 320, 'mouse');

        this.main = this.physics.add.sprite(200,100, 'mouse');
        this.main.anims.play('walk', 30, true);

        this.goodCheese = new Food(this, Phaser.Math.Between(0, 100), -320, 'goodCheese', 0);
        this.goodCheese2 = new Food(this, Phaser.Math.Between(140, 240), -320, 'goodCheese', 0);
        this.goodCheese3 = new Food(this, Phaser.Math.Between(360, 480), -320, 'goodCheese', 0);
        

        this.Cheese = new Obstacle(this, Phaser.Math.Between(0, 480), -640, 'badCheese', 0);
        this.Cheese2 = new Obstacle(this, Phaser.Math.Between(0, 480), -640, 'badCheese', 0);
        
        this.trap = new Obstacle(this, Phaser.Math.Between(0, 480), -640, 'trap', 0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.loopBackground();

        this.spawnAt();

        let textConfig = {
            fontFamily: 'Courier',
            fontSize:'15px',
            backgroundColor:'#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
              top: 0,
              bottom: 0,
              left: 100
            },
            fixedWidth: 480
          }
          
          this.hint = this.add.text(240, 320, 'press R at any time to restart', textConfig).setOrigin(0.5);

          this.time.delayedCall(2300, ()=>{this.hint.destroy();});
          
          //initialize score
          this.scoreBoard = this.add.text(0, 0, this.score, this.scoreConfig);
          this.time.delayedCall(3000, ()=>{
              this.speedUp = true;
              this.lol = this.add.image(240, 320, 'lol').setOrigin(0.5,0.5); 
              this.time.delayedCall(700, ()=>{this.lol.destroy();});
          });
         

    }

    update(){
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        
        this.controlMain();

        if(this.speedUp == true){
            this.floor.tilePositionY -= 10;
            this.goodCheese.moveSpeed = 6;
            this.goodCheese2.moveSpeed = 8;
            this.goodCheese3.moveSpeed = 5;
        } else {
            this.floor.tilePositionY -= 4;

        }
        this.goodCheese.update();
        this.goodCheese2.update();
        this.goodCheese3.update();
        
        this.Cheese.update();
        this.Cheese2.update();

        //this trap is fatal to the mouse
        this.trap.update();

        this.borderCollision(this.main);         //will collide with the border

        this.physics.world.collide(this.main, this.Cheese, this.cheeseCollide, null, this);
        this.physics.world.collide(this.main, this.Cheese2, this.cheese2Collide, null, this);
        this.physics.world.collide(this.main, this.goodCheese, this.goodCheeseCollide, null, this);
        this.physics.world.collide(this.main, this.goodCheese2, this.goodCheese2Collide, null, this);
        this.physics.world.collide(this.main, this.goodCheese3, this.goodCheese3Collide, null, this);

        this.physics.world.collide(this.main, this.trap, this.trapCollide, null, this);
    
        
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.music.stop();
            this.scene.restart();
        }

    }

    checkCollision(subject, object, todo){
        this.physics.world.collide(subject, object, todo, null, this);
    }

    borderCollision(object){

        if(object.y >= borderY){
            object.y = borderY;
        }
        if(object.y <= borderY / 2){
            object.y = borderY / 2;
        }
        if(object.x >= borderX){
            object.x = borderX;
        }
        if(object.x <= 0){
            object.x = 0;
        }

    }

    cheeseCollide(){
        //update new score
        this.scoreUpdate(-10);
        this.sound.play('hitBadCheese');
        this.Cheese.reset();
    }

    cheese2Collide(){
        //update new score
        this.scoreUpdate(-10);
        this.sound.play('hitBadCheese');
        this.Cheese2.reset();
    }

    goodCheeseCollide(){
        this.scoreUpdate(10);
        this.sound.play('hitGoodCheese');
        this.goodCheese.moveSpeed = 0;
        let boom = this.add.sprite(this.goodCheese.x, this.goodCheese.y, 'bloom1').setOrigin(0, 0);
        boom.anims.play('bloom1');
        this.goodCheese.reset();
        boom.on('animationcomplete', ()=>{
          this.goodCheese.alpha = 1;
          boom.destroy();
        });
    }

    goodCheese2Collide(){
        this.scoreUpdate(10);
        this.sound.play('hitGoodCheese');
        this.goodCheese2.moveSpeed = 0;
        let boom = this.add.sprite(this.goodCheese2.x, this.goodCheese2.y, 'bloom1').setOrigin(0, 0);
        boom.anims.play('bloom1');
        this.goodCheese2.reset();
        boom.on('animationcomplete', ()=>{
          this.goodCheese2.alpha = 1;
          boom.destroy();
        });
    }

    goodCheese3Collide(){
        this.scoreUpdate(10);
        this.sound.play('hitGoodCheese');
        this.goodCheese3.moveSpeed = 0;
        let boom = this.add.sprite(this.goodCheese3.x, this.goodCheese3.y, 'bloom1').setOrigin(0, 0);
        boom.anims.play('bloom1');
        this.goodCheese3.reset();
        boom.on('animationcomplete', ()=>{
          this.goodCheese3.alpha = 1;
          boom.destroy();
        });
    }

    trapCollide(){
        this.gameOver = true;
        let menuConfig = {
            fontFamily: 'Noteworthy',
            fontSize:'50px',
            backgroundColor: '#FACADE',
            color: '#843605',
            align: 'right',
            padding: {
                top: -2,
                bottom: -2,
            },
            fixedWidth: 0
        }

        this.time.delayedCall(100, ()=>{this.sound.play('trapSlap');}); //wait for 0.6s and play
        this.trap.reset();
        this.main.destroy();
        this.add.text(240, 320, 'Game Over!', menuConfig).setOrigin(0.5);
        this.music.stop();
        //this.time.delayedCall(600, ()=>{this.sound.play('gameover')});

    }

    cheeseReset(object){
        object.reset();
        ship.alpha = 0;
        //boom object, add sprite ship.x ship.y
    }

    getCheese(){
        let Cheese = new Obstacle(this, Phaser.Math.Between(0, 480), 0, 'badCheese', 0);
        this.cheeseGroup.add(Cheese);
    }

    mouseHitCheese(main, object){
        this.physics.world.collide(main, object,
        ()=>{
                console.log('cheeseReset');
                object.destroy();
            }
            ,null, this);  //collision detection
    }

    spawnAt(){
        this.goodCheese.lower = 0;
        this.goodCheese.higher = 160;
        this.goodCheese2.lower = 161;
        this.goodCheese2.higher = 320;
        this.goodCheese3.lower = 321;
        this.goodCheese3.higher = 480;
    }

    loopBackground(){
        this.music = this.sound.add('background');
        let loopConfig = {
                mute:false,
                volume:1,
                rate:1,
                detune:0,
                seek:0,
                loop:true,
                delay:0
            };

        this.music.play(loopConfig);
    }

    controlMain(){
        
        if(keyDOWN.isDown){
            this.main.y += 4;
        } else if(keyUP.isDown){
            this.main.y -= 4;
        } else if(keyLEFT.isDown){
            this.main.x -= 4;
        } else if(keyRIGHT.isDown){
            this.main.x += 4;
        }

        if(keyDOWN.isDown && keyLEFT.isDown){
            this.main.y += 1;
            this.main.x -= 4;
        } else if(keyUP.isDown && keyLEFT.isDown){
            this.main.y -= 1;
            this.main.x -= 4;
        } else if(keyUP.isDown && keyRIGHT.isDown){
            this.main.y -= 1;
            this.main.x += 4;
        } else if(keyDOWN.isDown && keyRIGHT.isDown){
            this.main.y += 1;
            this.main.x += 4;
        }
    }

    scoreUpdate(x){
        this.scoreBoard.destroy();
        this.score += x;
        this.scoreBoard = this.add.text(0, 0, this.score, this.scoreConfig);
    }
}