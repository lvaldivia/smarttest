Boost = function(game) {
	Global = {WIDTH:1080, HEIGHT:720};
	Score = 0;
}

Boost.prototype = {
	preload:function() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    	this.scale.pageAlignHorizontally = true;
    	this.scale.pageAlignVertically = true;
		this.load.image('loading', 'assets/loadingbar.png');
		this.load.image('background', 'assets/background.png');
	},

	create:function() {
		this.state.start('Preloader');
	},
}