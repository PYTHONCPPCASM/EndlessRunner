//main character class
class Mouse extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, texture){

        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

    }

    update(){

        if(keyDOWN.isDown){
            this.y += 4;
        } else if(keyUP.isDown){
            this.y -= 4;
        } else if(keyLEFT.isDown){
            this.x -= 4;
        } else if(keyRIGHT.isDown){
            this.x += 4;
        }

        if(keyDOWN.isDown && keyLEFT.isDown){
            this.y += 1;
            this.x -= 4;
        } else if(keyUP.isDown && keyLEFT.isDown){
            this.y -= 1;
            this.x -= 4;
        } else if(keyUP.isDown && keyRIGHT.isDown){
            this.y -= 1;
            this.x += 4;
        } else if(keyDOWN.isDown && keyRIGHT.isDown){
            this.y += 1;
            this.x += 4;
        }

    }

}