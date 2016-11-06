GameOver = function(game){
	this.backGround = null;
	this.retryBtn = null;
    this.scoreText = null;
    this.scoreText2 = null;
}

GameOver.prototype = {
	create: function () {
		this.backGround = this.add.sprite(0, 0, 'gameover');
		this.fontStyle1 = {font:'bold 32px Arial', fill:'#1F3868', stroke: "#333", strokeThickness: 5};
        this.fontStyle2 = {font:'28px Arial', fill:'#FFFFFF', stroke: "#333", strokeThickness: 5};
		this.scoreText2 = this.add.text(490, 450, 'SCORE', this.fontStyle1);
		if (Score == 0) {
			this.scoreText = this.add.text(520, 500, '\t 0', this.fontStyle2);
		} else {
			this.scoreText = this.add.text(520, 500, Score, this.fontStyle2);
		}        
		this.retryBtn = this.add.button(0, 0, 'retry', this.retryGame, this);
		this.retryBtn.x = 442;
		this.retryBtn.y = 567;
	},

	retryGame: function() {
		this.state.start('Menu');
	},
}
