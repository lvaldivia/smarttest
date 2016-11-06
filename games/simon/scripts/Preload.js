Preload = function(){}

Preload.prototype = {
    preload:function(){
        this.game.load.image('bg','assets/bg_oscuro.jpg');
        this.game.load.image('logo','assets/logo.png');
        this.game.load.image('table','assets/simon-dice-retro-assets_104.png');
        this.game.load.image('A','assets/simon-dice-retro-assets_106.png');
        this.game.load.image('B','assets/simon-dice-retro-assets_107.png');
        this.game.load.image('C','assets/simon-dice-retro-assets_108.png');
        this.game.load.image('D','assets/simon-dice-retro-assets_109.png');
        
        this.game.load.image("A_press",'assets/down_btn_13.png');
        this.game.load.image("B_press",'assets/down_btn_15.png');
        this.game.load.image("C_press",'assets/down_btn_17.png');
        this.game.load.image("D_press",'assets/down_btn_25.png');
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	this.scale.pageAlignHorizontally = true;
    	this.scale.pageAlignVertically = true;
    },
    create:function(){
        this.game.state.start('Game');
    }
}