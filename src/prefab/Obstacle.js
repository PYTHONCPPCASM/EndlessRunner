class Obstacle extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.x = x;
        this.y = y;
        this.newCheese = true;
        this.moveSpeed = 3;
    }

    //its update method are basically all about spawning on top of the screen

    update(){

        this.y += this.moveSpeed;

        if(this.y >= borderY){  //over the border it is destroyed
            this.reset();
        }

    }

    reset(){
        this.x = this.range(0, 480);
        this.y = this.range(-960, -320);
    }

    range(a, b){
        return Phaser.Math.Between(a, b);
    }
}