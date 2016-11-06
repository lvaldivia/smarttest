Preloader = function(game) {
	this.preloadBar = null;
	this.backGround = null;
}

Preloader.prototype = {
	preload:function() {
		this.backGround = this.add.sprite(0, 0, 'background');
		this.preloadBar = this.add.sprite(0, 0, 'loading');
		this.preloadBar.x = (Global.WIDTH - this.preloadBar.width) / 2;
		this.preloadBar.y = (Global.HEIGHT - this.preloadBar.height) / 2;
		this.load.setPreloadSprite(this.preloadBar);
		
		this.load.image('card1', 'assets/card1.png');
		this.load.image('card2', 'assets/card2.png');
		this.load.image('card3', 'assets/card3.png');
		this.load.image('card4', 'assets/card4.png');
		this.load.image('start', 'assets/start.png');
		this.load.image('retry', 'assets/retry.png');
		this.load.image('title1', 'assets/title1.png');
		this.load.image('title2', 'assets/title2.png');
		this.load.image('gameover', 'assets/gameover.png');
		this.load.image('gamevictory', 'assets/gamevictory.png');
		this.load.image('instructions', 'assets/instructions.png');

		this.load.image('spades1', 'assets/cards/spades1.jpg');
		this.load.image('spades2', 'assets/cards/spades2.jpg');
		this.load.image('spades3', 'assets/cards/spades3.jpg');
		this.load.image('spades4', 'assets/cards/spades4.jpg');
		this.load.image('spades5', 'assets/cards/spades5.jpg');
		this.load.image('spades6', 'assets/cards/spades6.jpg');
		this.load.image('spades7', 'assets/cards/spades7.jpg');
		this.load.image('spades8', 'assets/cards/spades8.jpg');

		this.load.image('cardback', 'assets/cards/cardback.png');

		this.load.image('heart', 'assets/heart.png');
		this.load.image('emptyheart', 'assets/emptyheart.png');
	},

	create:function() {
		this.state.start('Menu');
	},
}