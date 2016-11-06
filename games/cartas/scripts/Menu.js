Menu = function(game) {
	this.backGround = null;
	this.card1 = null;
	this.card2 = null;
	this.card3 = null;
	this.card4 = null;
	this.title1 = null;
	this.title2 = null;
	this.instructionsBtn = null;
	this.startBtn = null;
	this.buttons = [];
	this.currentIndex = 0;
}

Menu.prototype = {
	create:function() {
		this.backGround = this.add.sprite(0, 0, 'background');
		this.card1 = this.add.sprite(0, 0, 'card1');
		this.card2 = this.add.sprite(0, 0, 'card2');
		this.card3 = this.add.sprite(0, 0, 'card3');		
		this.title1 = this.add.sprite(0, 0, 'title1');
		this.card4 = this.add.sprite(0, 0, 'card4');
		this.title2 = this.add.sprite(0, 0, 'title2');
		this.startBtn = this.add.button(0, 0, 'start', this.startGame, this);
		this.instructionsBtn = this.add.button(0, 0, 'instructions', this.instructionsGame, this);

		this.startBtn.alpha = 0.0;
		this.instructionsBtn.alpha = 0.0;

		this.startBtn.x = 79;
		this.startBtn.y = 467;
		this.instructionsBtn.x = 79;
		this.instructionsBtn.y = 576;
		this.card1.x = Global.WIDTH;
		this.card1.y = 83;
		this.card2.x = Global.WIDTH;
		this.card2.y = 56;
		this.card3.x = Global.WIDTH;
		this.card3.y = 56;
		this.card4.x = Global.WIDTH;
		this.card4.y = 93;
		this.title1.x = Global.WIDTH;
		this.title1.y = Global.HEIGHT;
		this.title2.x = Global.WIDTH;
		this.title2.y = Global.HEIGHT;

		var tweenCard1 = this.add.tween(this.card1);
		tweenCard1.to({x:571}, 500);
		tweenCard1.onComplete.add(this.tweenCard2, this);
		tweenCard1.start();
		
		this.functions = [this.startGame, this.instructionsGame];
		
		this.buttons = 
			[this.startBtn, this.instructionsBtn];
		
		var up = this.game.input.keyboard.addKey(VK_UP);
		var down = 
			this.game.input.keyboard.addKey(VK_DOWN);
		up.onDown.add(this.moveUp, this);
		down.onDown.add(this.moveDown,this);
		that = this;
		var enter = this.game.input.keyboard.addKey(VK_ENTER);
		enter.onDown.add(this.execute,this);
	},
	execute:function(){
		if(this.buttons[this.currentIndex].alpha == 1){
			this.functions[this.currentIndex]();
		}	
	},
	
	moveDown:function(){
		var total = 0;
		this.buttons.forEach(function(button){
			if(button.alpha == 1){
				total++;
			}
		},this);
		if(total == this.buttons.length){
			if(this.currentIndex < this.buttons.length -1){
				this.buttons[this.currentIndex].scale.setTo(1);
				this.currentIndex++;
				this.buttons[this.currentIndex].scale.setTo(1.2);
			}
		}
	},
	moveUp:function(){
		var total = 0;
		this.buttons.forEach(function(button){
			if(button.alpha == 1){
				total++;
			}
		},this);
		if(total == this.buttons.length){
			if(this.currentIndex > 0){
				this.buttons[this.currentIndex].scale.setTo(1);
				this.currentIndex--;
				this.buttons[this.currentIndex].scale.setTo(1.2);
			}
		}
	},

	tweenCard2:function() {
		var tweenCard2 = this.add.tween(this.card2);
		tweenCard2.to({x:649}, 500);
		tweenCard2.onComplete.add(this.tweenCard3, this);
		tweenCard2.start();
	},

	tweenCard3:function() {
		var tweenCard3 = this.add.tween(this.card3);
		tweenCard3.to({x:698}, 500);
		tweenCard3.onComplete.add(this.tweenLogo1, this);
		tweenCard3.start();
	},

	tweenLogo1:function() {
		var tweenLogo1 = this.add.tween(this.title1);
		tweenLogo1.to({x:339, y:163}, 500);
		tweenLogo1.onComplete.add(this.tweenLogo2, this);
		tweenLogo1.start();
	},

	tweenLogo2:function() {
		var tweenLogo2 = this.add.tween(this.title2);
		tweenLogo2.to({x:479, y:299}, 500);
		tweenLogo2.onComplete.add(this.tweenCard4, this);
		tweenLogo2.start();
	},

	tweenCard4:function() {
		var tweenCard4 = this.add.tween(this.card4);
		tweenCard4.to({x:764}, 500);
		tweenCard4.onComplete.add(this.tweenButtons, this);
		tweenCard4.start();
	},

	tweenButtons:function() {
		var tweenButtons1 = this.add.tween(this.startBtn);
		var tweenButtons2 = this.add.tween(this.instructionsBtn);
		tweenButtons1.to({alpha:1.0}, 1000);
		tweenButtons2.to({alpha:1.0}, 1000);
		tweenButtons1.start();
		tweenButtons2.start();
	},

	startGame:function() {
		history.pushState({}, 'game', '/game');
		that.state.start('Game');
	},

	instructionsGame:function() {
		history.pushState({}, 'instructions', '/instructions');
		that.state.start('Instructions');
	},
}