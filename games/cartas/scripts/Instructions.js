Instructions = function(game) {
	this.fontStyle1 = null;
	this.fontStyle2 = null;
	this.backGround = null;
	this.startBtn = null;
	this.instructionsText1 = null;
	this.instructionsText2 = null;
	this.instructionsText3 = null;
	this.instructionsText4 = null;
	this.instructionsText5 = null;
	this.instructionsText6 = null;
	this.integrantesText1 = null;
	this.integrantesText2 = null;
	this.integrantesText3 = null;
	this.integrantesText4 = null;
}

Instructions.prototype = {
	preload: function () {
		
	},

	create: function () {
		this.backGround = this.add.sprite(0, 0, 'background');
		this.fontStyle1 = {font:'bold 32px Arial', fill:'#3399FF', stroke: "#333", strokeThickness: 5};
		this.fontStyle2 = {font:'28px Arial', fill:'#FFFFFF', stroke: "#333", strokeThickness: 5};

		this.instructionsText1 = this.add.text(50, 50, 'Instrucciones:', this.fontStyle1);
		this.instructionsText2 = this.add.text(50, 100, '\t El juego consiste en descubrir las parejas decartas iguales antes que', this.fontStyle2);
		this.instructionsText3 = this.add.text(50, 140, '\t se acabe el tiempo limite de 30 segundos y consiguiendo el mayor puntaje', this.fontStyle2);
		this.instructionsText4 = this.add.text(50, 180, '\t posible en dicho tiempo.', this.fontStyle2);
		this.instructionsText5 = this.add.text(50, 260, '\t Habra un multiplicador (combo) que te ayudara a conseguir un mayor puntaje', this.fontStyle2);
		this.instructionsText6 = this.add.text(50, 300, '\t siempre que consigas descubrir parejas de cartas seguidas.', this.fontStyle2);
		this.instructionsText7 = this.add.text(50, 380, '\t El juego tambien termina si fallas en descubrir parejas 5 veces. ', this.fontStyle2);

		/*this.integrantesText1 = this.add.text(50, 500, 'Integrantes:', this.fontStyle1);
		this.integrantesText2 = this.add.text(50, 550, '\t -Alberto Gonzalez', this.fontStyle2);
		this.integrantesText3 = this.add.text(50, 590, '\t -Andres Revolledo', this.fontStyle2);
		this.integrantesText4 = this.add.text(50, 630, '\t -Renzo Villavisencio', this.fontStyle2);*/

		this.startBtn = this.add.button(0, 0, 'start', this.startGame, this);
		this.startBtn.x = 800;
		this.startBtn.y = 550;
	},

	startGame:function() {
		this.state.start('Game');
	},
}