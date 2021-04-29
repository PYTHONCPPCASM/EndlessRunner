class Loading extends Phaser.Scene{
    constructor(){
        super("loadScene");
    }

    create(){

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

        this.loading = this.add.text(240, 320, 'loading...', titleConfig).setOrigin(0.5);
        
        console.log('loadscene');

        this.time.delayedCall(1000, ()=>{this.scene.start('playScene');});

    }

}