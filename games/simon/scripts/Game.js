Game = function(){}

Game.prototype = {
    create:function(){
        this.bg = this.game.add.sprite(0,0,'bg');
        this.table = this.game.add.sprite(0,0,'table');
        this.table.anchor.setTo(0.5);
        this.table.x = this.game.world.centerX;
        this.table.y = this.game.world.centerY;
        
        this.a = this.game.add.sprite(220,250,'A');
        this.b = this.game.add.sprite(440,250,'B');
        this.c = this.game.add.sprite(650,250,'C');
        this.d = this.game.add.sprite(850,250,'D');
        
        this.off = [this.a,this.b,this.c,this.d];
        this.a_press = this.game.add.sprite(110,120,'A_press');
        this.b_press = this.game.add.sprite(350,120,'B_press');
        this.c_press = this.game.add.sprite(590,120,'C_press');
        this.d_press = this.game.add.sprite(820,120,'D_press');
        
        this.on = [this.a_press,this.b_press,this.c_press,this.d_press];
        
        this.on.forEach(function(btn){
            btn.visible = false;
        },this);
        
        var style = {
            font: '40px Retroesque',
            fill: 'white'
        };
        this.youturn = this.game.add.text(0,0,'Get ready',style);
        this.youturn.x = this.game.world.centerX;
        this.youturn.y = 150;
        this.youturn.anchor.setTo(0.5);
        
        this.scoreLabel = this.game.add.text(0,0,'Score',style);
        this.scoreLabel.x = this.game.width - 150;
        this.scoreLabel.y = 50;
        this.scoreLabel.anchor.setTo(0.5);
        this.score = 0;
        this.scoreTxt = this.game.add.text(0,0,this.score,style);
        this.scoreTxt.x = this.game.width - 150;
        this.scoreTxt.y = 150;
        this.scoreTxt.anchor.setTo(0.5);
        this.countdown = 0;
        this.totalTime = 3;
        this.elapsedTime = 2000;
        this.startGame = false;
        this.startCountdown = false;
        this.offActive = false;
        this.isMyTurn = false;
        this.animPlayerTurn = false;
        this.restartSimon = false;
        this.gameOver = false;
        this.elapsed = 0;
        this.elapsedTemp = 0;
        this.sequence = 0;
        this.attemps = 0;
        this.totalSequence = 2;
        this.sequences = [];
        this.currentIndex = 0;
        
        var a = this.game.input.keyboard.addKey(VK_RED);
        var b = this.game.input.keyboard.addKey(VK_GREEN);
        var c = this.game.input.keyboard.addKey(VK_YELLOW);
        var d = this.game.input.keyboard.addKey(VK_BLUE);
        
        var letters = [a,b,c,d];
        letters.forEach(function(letter,i){
            letter.onDown.add(function(){
               this.checkPlayer(i);
            }, this);
             
        },this);
        
        this.off.forEach(function(btn,i) {
            btn.inputEnabled = true;
            btn.events.onInputDown.add(function(){
                this.checkPlayer(i);
            },this);
        },this);
    },
    checkPlayer:function(index){
        if(this.isMyTurn && !this.restartSimon && !this.gameOver){
            if(!this.animPlayerTurn){
                if(this.sequences[this.sequence] == index){
                    this.sequence++;
                    this.off[index].visible = false;
                    this.on[index].visible = true;
                    this.animPlayerTurn = true;
                }else{
                    this.gameOver = true;
                    history.go(-history.length -2);
                    history.pushState({},'gameover','/gameover');
                    this.game.state.start('GameOver');
                }    
            }
        }
    },
    update:function(){
        if(!this.gameOver){
            if(!this.startGame){
                this.showCountdown();
            }else if(!this.isMyTurn){
                this.startSimon();
            }else if(this.animPlayerTurn){
                this.elapsedTemp+= this.game.time.elapsed;
                if(this.elapsedTemp>=400){
                    this.elapsedTemp = 0;
                    this.animPlayerTurn = false;
                    this.on.forEach(function(btn) {
                        btn.visible = false;
                    },this);
                    this.off.forEach(function(btn) {
                        btn.visible = true;
                    },this);
                    this.attemps++;
                    if(this.attemps == this.sequences.length){
                        this.sequence = 0;
                        this.attemps = 0;
                        this.restartSimon =true;
                        this.score +=100;
                        this.scoreTxt.text= this.score;
                    }
                }
            }else if(this.restartSimon){
                this.elapsedTemp+=this.game.time.elapsed;
                if(this.elapsedTemp>=400){
                    this.elapsedTemp = 0;
                    this.youturn.text = "My turn";
                    this.restartSimon = false;
                    this.isMyTurn = false;
                    this.randomLetter(1);
                }
            }
        }
    },
    startSimon:function(){
        this.elapsed+= this.game.time.elapsed;
        if(this.elapsed>=1000){
            this.elapsed = 0;
            if(this.sequence < this.totalSequence){
                var index = this.sequences[this.sequence];
                if(this.offActive){
                    this.on[index].visible = false;
                    this.off[index].visible = true;
                    this.sequence++;
                }else{
                    this.off[index].visible = false;
                    this.on[index].visible = true;    
                }
                this.offActive = !this.offActive;
            }
            if(this.sequence == this.totalSequence){
                this.isMyTurn = true;
                this.sequence = 0;
                this.youturn.text = "Your turn";
            }
        }
    },
    randomLetter:function(values){
        for(var i = 0;i < values;i++){
            var index = this.game.rnd.integerInRange(0,3);
            this.sequences.push(index);
        }
        this.totalSequence = this.sequences.length;
    },
    showCountdown:function(){
        this.countdown+=this.game.time.elapsed;
            if(this.countdown>=this.elapsedTime){
                this.countdown = 0;
                if(!this.startCountdown){
                    this.startCountdown = true;
                    this.youturn.text = this.totalTime;
                    this.elapsedTime = 1000;
                }else{
                    this.totalTime--;
                    this.youturn.text = this.totalTime;
                    if(this.totalTime == 0){
                        this.youturn.text = "Watch the sequence";
                        this.startGame = true;
                        this.randomLetter(this.totalSequence);
                    }
                }
            }
    }
}