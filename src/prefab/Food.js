class Food extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.x = x;
        this.y = y;
        this.Food = true;
        this.moveSpeed = 4;
        this.lower = 0;
        this.higher = 480;
        this.name = 'default';
    }

    update(){
        this.y += this.moveSpeed;
        if(this.y >= borderY){
            this.reset();
        }
    }

    reset(){
        this.moveSpeed = 4;
        this.x = this.range(this.lower, this.higher);
        this.y = this.range(-320, 0);
    }

    range(a, b){
        return Phaser.Math.Between(a, b);
    }

    badCheeseCollide(){
        console.log('badCheese');
    }

}