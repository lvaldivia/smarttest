Game = function(game) {
	this.deck = null;
	this.card = null;
    this.heart = null;
    this.lifeBar = null
    this.fontStyle1 = null;
    this.fontStyle2 = null;
    this.hideTimer = null;
    this.firstCard = null;
    this.secondCard = null;
    this.backGround = null;
    this.timerText = null;
    this.timerText2 = null;
    this.scoreText = null;
    this.scoreText2 = null;
    this.multiplyerText = null;
    this.multiplyerText2 = null;
    this.life = 5;
    this.elapsed = 0;
    this.pairCount = 0;
    this.multiplyer = 1;
    this.numCartas = 16;
    this.combo = true;
    this.isSame = false;
    this.timeLimit = 80000;
    this.vecNumeroCartas = [];
    this.currentIndex = 0;
    this.vecImages = ['spades1', 'spades2', 'spades3', 'spades4', 'spades5', 'spades6', 'spades7', 'spades8'];
}

Game.prototype = {
    preload: function() {
        this.clearVariables();
        this.hideTimer = this.time.create(false);
    },

    create: function () {
        this.backGround = this.add.sprite(0, 0, 'background');
        this.imagesVectorGenerator();
        this.layout();
        var up = this.game.input.keyboard.addKey(VK_UP);
		var down = 
			this.game.input.keyboard.addKey(VK_DOWN);
		up.onDown.add(this.moveUp, this);
		down.onDown.add(this.moveDown,this);
		var enter = this.game.input.keyboard.addKey(VK_ENTER);
		enter.onDown.add(this.moveEnter,this);
		var left = this.game.input.keyboard.addKey(VK_LEFT);
		var right = 
			this.game.input.keyboard.addKey(VK_RIGHT);
		left.onDown.add(this.moveLeft, this);
		right.onDown.add(this.moveRight,this);

        this.fontStyle1 = {font:'bold 32px Arial', fill:'#3399FF', stroke: "#333", strokeThickness: 5};
        this.fontStyle2 = {font:'28px Arial', fill:'#FFFFFF', stroke: "#333", strokeThickness: 5};
        this.timerText2 = this.add.text(920, 70, 'TIME', this.fontStyle1);
        this.timerText = this.add.text(925, 120, '30:00', this.fontStyle2);
        this.scoreText2 = this.add.text(900, 200, 'SCORE', this.fontStyle1);
        this.scoreText = this.add.text(930, 250, '\t 0', this.fontStyle2);
        this.multiplyerText2 = this.add.text(895, 330, 'COMBO', this.fontStyle1);
        this.multiplyerText = this.add.text(900, 380, '\t \t x 1', this.fontStyle2);
        this.lifeBar = this.add.group();
        for (var i = 0; i < this.life; i++) {
            this.heart = this.add.sprite(0, 0, 'heart');
            this.heart.x = 940;
            this.heart.y = 460 + (40 * i);
            this.heart.width = this.heart.height = 30;
            this.lifeBar.add(this.heart);
        }
        that = this;
    },
    moveEnter:function(){
        this.clickCard(this.deck.children[this.currentIndex]);
    },
    moveDown:function(){
        var index = this.currentIndex;
        switch(this.currentIndex){
            case 6:
            case 11:
                index = this.currentIndex;
                break;
            default:
                if(index>6 && index<11){
                    index+=5;
                }else
                {
                    index+=6;    
                }
            break;
        }
        if(index< this.deck.children.length 
            && index != this.currentIndex){
            this.deck.children[this.currentIndex].scale.setTo(1);
            this.deck.children[index].scale.setTo(1.1);
            this.currentIndex = index;
        }
        
    },
    moveUp:function(){
        var index = this.currentIndex;
        switch(this.currentIndex){
            case 0:
            case 5:
                index = this.currentIndex;
                break;
            default:
                if(index>11 && index<16){
                    index-=5;
                }else
                {
                    index-=6;    
                }
            break;
        }
        if(index >=0 
            && index != this.currentIndex){
            this.deck.children[this.currentIndex].scale.setTo(1);
            this.deck.children[index].scale.setTo(1.1);
            this.currentIndex = index;
        }
        
    },
    moveLeft:function(){
        if(this.currentIndex>0 && this.currentIndex!=6){
            this.deck.children[this.currentIndex].scale.setTo(1);
            this.currentIndex--;
            this.deck.children[this.currentIndex].scale.setTo(1.1);
            
        }
    },
    moveRight:function(){
        if(this.deck.children.length - 1 > this.currentIndex){
            if(this.currentIndex != 5 && this.currentIndex != 11){
                this.deck.children[this.currentIndex].scale.setTo(1);
                this.currentIndex++;
                this.deck.children[this.currentIndex].scale.setTo(1.1);        
            }
            
        }
    },


    update: function () {
        this.elapsed += this.time.elapsed;

        var seconds = Math.floor((this.timeLimit - this.elapsed) / 1000);
        var miliSeconds = Math.floor(((this.timeLimit - this.elapsed) - seconds * 1000) / 10);

        if (seconds < 0) {
             this.timerText.text = '00:00';
        } else {
            this.timerText.text = seconds + ':' + miliSeconds;
        }

        if (this.elapsed >= this.timeLimit) {
           // this.gameOver();
        };
    },
    
    
    layout: function () {
        var row = -1;
        var column = 0
        this.deck = this.add.group();

		for (var i = 0; i < 16; i++) {
		    this.card = this.add.sprite(0, 0, 'cardback');
            this.card.events.onInputDown.add(this.clickCard, this);
		    this.card.inputEnabled = true;
		    var indice = Math.floor(Math.random() * this.vecNumeroCartas.length);
		    this.card.name = this.vecNumeroCartas[indice];
		    this.vecNumeroCartas.splice(indice, 1);

			column = i % 6;
			if (column == 0) {
				row++;
			};

            if (i < 12) {
                if (i == 0 || i == 5 || i == 6 || i == 11) {
                    this.card.x = column * (this.card.width + 20) + 25;
                    this.card.y = row * (this.card.height + 20) + 160;
                } else {
                    this.card.x = column * (this.card.width + 20) + 25;
                    this.card.y = row * (this.card.height + 20) + 70;
                }
            } else {
                this.card.x = column * (this.card.width + 20) + 159;
                this.card.y = row * (this.card.height + 20) + 70;
            }
			this.deck.add(this.card);
		}
		this.deck.children[this.currentIndex].scale.setTo(1.1);
    },
    
    gameOver:function(){
        history.go(-history.length -2);
        history.pushState({},'gameover','/gameover');
        this.state.start('GameOver');
    },


    imagesVectorGenerator: function () {
        var num = 0;
        var cont = 0;
        for (var i = 0; i < this.numCartas; i++) {
            cont++;
            if (cont > 2) {
                num++;
                cont = 1;
            }
            this.vecNumeroCartas[i] = num;
        }
    },

    clickCard: function (card) {
        if (that.secondCard != null)
            return;

        that.showCard(card);

        if (that.firstCard == null) {
            that.firstCard = card;
        }
        else {
            if (card == that.firstCard) {
                that.firstCard = null;
                that.hideCard(card);
                that.multiplyer = 1;
                that.combo = false;
                that.multiplyerText.text = '\t \t x 1';
                return;
            }
            that.secondCard = card;
            that.checkPairs();
        }
    },
    
    checkPairs: function () {
        if (this.firstCard.name == this.secondCard.name) {
            this.isSame = true;
        } else {
            this.isSame = false;
        }
        this.hideTimer.add(500, this.waiting, this);
        this.hideTimer.onComplete.add(this.hideBothCards, this);
        this.hideTimer.start();
    },

    hideBothCards: function () {
        if (this.isSame) {
            this.firstCard.kill();
            this.secondCard.kill();

            this.pairCount++;
            Score += 100 * this.multiplyer;
            this.scoreText.text = Score;
            this.combo = true;

            if (this.combo) {
                this.multiplyer++;
                this.multiplyerText.text = '\t \t x ' + this.multiplyer;
            };
        } else {
            this.hideCard(this.firstCard);
            this.hideCard(this.secondCard);
            this.combo = false;
            this.multiplyer = 1;
            this.multiplyerText.text = '\t \t x 1';
            this.loseHeart();
        }
        
        this.firstCard = null;
        this.secondCard = null;

        if (this.pairCount >= 8) {
            this.state.start('GameVictory');
        };
    },

    loseHeart: function () {
        this.lifeBar.getChildAt(this.life-1).loadTexture('emptyheart');
        this.life--;
        if (this.life <= 0) {
            this.gameOver();
        };
    },

    showCard: function (card) {
        card.loadTexture(this.vecImages[card.name]);
    },

    hideCard: function (card) {
        card.loadTexture('cardback');
    },

    clearVariables: function () {
        Score = 0;
        this.deck = null;
        this.card = null;
        this.heart = null;
        this.lifeBar = null
        this.fontStyle1 = null;
        this.fontStyle2 = null;
        this.hideTimer = null;
        this.firstCard = null;
        this.secondCard = null;
        this.backGround = null;
        this.timerText = null;
        this.timerText2 = null;
        this.scoreText = null;
        this.scoreText2 = null;
        this.multiplyerText = null;
        this.multiplyerText2 = null;
        this.life = 5;
        this.elapsed = 0;
        this.pairCount = 0;
        this.multiplyer = 1;
        this.numCartas = 16;
        this.combo = true;
        this.isSame = false;
        this.vecNumeroCartas = [];
        this.timeLimit = 10000;
        this.currentIndex = 0;
        this.vecImages = ['spades1', 'spades2', 'spades3', 'spades4', 'spades5', 'spades6', 'spades7', 'spades8'];
    },
    
    waiting:function() {

    },
}