Menu = function(){}

Menu.prototype = {
    create:function(){
        this.bg = this.game.add.sprite(0,0,'bg');
        this.logo = this.game.add.sprite(0,0,'logo');
        this.logo.anchor.setTo(0.5);
        this.logo.x=this.game.world.centerX;
        this.logo.y=this.game.world.centerY;
        
        var enter = this.game.input.keyboard.addKey(VK_ENTER);
        enter.onDown.add(this.startGame, this);
        this.game.input.onDown.add(this.startGame,this);
    },
    startGame:function(){
        history.pushState({}, 'game', '/game');
        this.game.state.start('Game');
    }
}