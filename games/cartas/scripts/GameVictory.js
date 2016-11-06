GameVictory = function(game){
	this.backGround = null;
	this.retryBtn = null;
	this.scoreText = null;
    this.scoreText2 = null;
}

GameVictory.prototype = {
	create: function () {
		this.backGround = this.add.sprite(0, 0, 'gamevictory');
		this.fontStyle1 = {font:'bold 32px Helvetica', fill:'#FFFFFF', stroke: "#FFF", strokeThickness: 2};
        this.fontStyle2 = {font:'28px Helvetica', fill:'#FFFFFF', stroke: "#FFF", strokeThickness: 2};
		this.scoreText2 = this.add.text(470, 290, 'SCORE', this.fontStyle1);
		if (Score == 0) {
			this.scoreText = this.add.text(600, 292, '\t 0', this.fontStyle2);
		} else {
			this.scoreText = this.add.text(600, 292, Score, this.fontStyle2);
		}
		this.retryBtn = this.add.button(0, 0, 'retry', this.retryGame, this);
		this.retryBtn.x = 455;
		this.retryBtn.y = 567;
	},

	retryGame: function() {
		this.state.start('Menu');
	},
}
