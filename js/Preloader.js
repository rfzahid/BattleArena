// Global variables declared here...

var preloaderBackground;
var battleArenaLogo;
var progressBar;
var ready;

BasicGame.Preloader = function (game) {

	this.preloaderBackground = null;
	this.progressBar = null;
	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		// Adding 'loading screen' items in preload so that the user actually sees the game is being loaded.

		this.preloaderBackground = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBackground');
		this.preloaderBackground.anchor.setTo(0.5);
		this.battleArenaLogo = this.add.sprite(this.game.world.centerX, this.game.world.centerY * (1 / 3) + 100, 'battleArenaLogo');
		this.battleArenaLogo.anchor.setTo(0.5);
		this.battleArenaLogo.scale.setTo(0.5, 0.5);
		this.progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'progressBar');
		this.progressBar.anchor.setTo(0.5);
		this.progressBar.scale.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.progressBar);

		this.status = this.add.text(this.game.world.centerX, this.game.world.centerY * (4 / 3), 'Loading...');
		this.status.anchor.setTo(0.5);

		// Load assets for next state(i.e MainMenu.js)

		this.load.image('playButton', 'assets/images/playButton.png');
		this.load.image('options', 'assets/images/options.png');
		this.load.image('credits', 'assets/images/credits.png');
		this.load.audio('titleMusic', 'assets/sounds/mainMenu.wav');

		// Load assets for gameplay(i.e Game.js)

		this.game.load.spritesheet('player', 'assets/images/player.png', 32, 48);
		this.game.load.image('star', 'assets/images/star.png');
		this.game.load.image('groundLedge', 'assets/images/groundLedge.png');
		this.game.load.image('net', 'assets/images/net.png');
		this.game.load.image('ball', 'assets/images/ball.png');
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.progressBar.cropEnabled = false;

	},

	// Wait for the music to decode completely before proceeding to next state...
	update: function () {
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {

			this.ready = true;
			this.state.start('MainMenu');

		}
	}
};