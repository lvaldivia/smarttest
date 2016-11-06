var game = new Phaser.Game(1280,720, Phaser.AUTO);
game.state.add('Preload',Preload);
game.state.add('Menu',Menu);
game.state.add('Game',Game);
game.state.add('GameOver',GameOver);
game.state.start('Preload');

window.onpopstate = function(event) {
	var res = location.pathname.split("/");
	switch (res[1]) {
		case 'game':
			game.state.start("Game");
			break;
		default:
			game.state.start("Menu");
			break;
			
	}
}	