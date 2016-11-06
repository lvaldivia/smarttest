GameOver = function(){}

GameOver.prototype = {
    create:function(){
        this.bg = this.game.add.sprite(0,0,'bg');
        var style = {
            font: '80px Retroesque',
            fill: 'white'
        };
        this.youturn = this.game.add.text(0,0,'Game Over',style);
        this.youturn.x = this.game.world.centerX;
        this.youturn.y = this.game.world.centerY;
        this.youturn.anchor.setTo(0.5);
        
        var enter = this.game.input.keyboard.addKey(VK_ENTER);
        enter.onDown.add(this.startGame, this);
        this.game.input.onDown.add(this.startGame,this);
    },
    startGame:function(){
        this.game.state.start('Menu');
    }
}