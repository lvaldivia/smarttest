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
        this.countdown = 0;
        this.totalTime = 3;
        this.elapsedTime = 2000;
        this.startGame = false;
        this.startCountdown = false;
        this.isMyTurn = false;
        this.elapsed = 0;
        this.sequence = 0;
        this.totalSequence = 2;
        this.sequences = [];
        this.sequencesUser = [];
        this.currentIndex = 0;
        
        var a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var b = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
        var c = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        var d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        
        a.onDown.add(function(){
            this.checkPlayer(0);
        }, this);
        b.onDown.add(function(){
            this.checkPlayer(1);
        }, this);
        c.onDown.add(function(){
            this.checkPlayer(2);
        }, this);
        d.onDown.add(function(){
            this.checkPlayer(3);
        }, this);
    },
    checkPlayer:function(index){
        if(!this.on[this.sequence-1].visible){
            //this.off[this.sequence -1].visible = false;
            //this.on[this.sequence-1].visible = true;
        }
        console.log(this.sequences[this.currentIndex]);
        console.log(index);
        if(this.sequences[this.currentIndex] == index){
            //console.log('check')   ;
        }
    },
    update:function(){
        if(!this.startGame){
            this.showCountdown();
        }else{
            this.startSimon();
        }
        if(this.isMyTurn){
            
        }
    },
    startSimon:function(){
        this.elapsed+= this.game.time.elapsed;
        if(this.elapsed>=1000){
            this.elapsed = 0;
            if(this.sequence < this.totalSequence){
                this.off.forEach(function(a){
                    a.visible = true;
                },this);
                this.on.forEach(function(a){
                    a.visible = false;
                },this);
                var index = this.sequences[this.sequence];
                this.off[index].visible = false;
                this.on[index].visible = true;
                this.sequence++;
            }
            if(this.sequence == this.totalSequence){
                this.isMyTurn = true;
                this.youturn.text = "Your turn";
            }
        }
    },
    randomLetter:function(){
        for(var i = 0;i < this.totalSequence;i++){
            var index =   this.game.rnd.integerInRange(0,3);
            this.sequences.push(index);
        }
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
                        this.randomLetter();
                    }
                }
            }
    }
}