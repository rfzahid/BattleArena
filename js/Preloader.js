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

		// Load assets for next state...

		this.load.image('background', 'assets/images/background.png');
		this.load.image('playButton', 'assets/images/playButton.png');
		this.load.image('options', 'assets/images/options.png');
		this.load.image('credits', 'assets/images/credits.png');
		this.load.audio('titleMusic', 'assets/sounds/mainMenu.wav');
	},

	create: function () {
		this.progressBar.cropEnabled = false;

	},

	update: function () {
		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {

			this.ready = true;
			this.state.start('MainMenu');

		}
	}
};