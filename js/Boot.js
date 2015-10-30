var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

	init: function () {

		// If multi-touch control is not used, then...
		this.input.maxPointers = 1;

		//  Disable pausing if the browser tab the game is in loses focus..
		this.stage.disableVisibilityChange = true;

		if (this.game.device.desktop) {
			//  If you have any desktop specific settings, they can go in here
			this.scale.pageAlignHorizontally = true;
		} else {
			//  Same goes for mobile settings.
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.scale.setMinMax(480, 260, 1024, 768);
			this.scale.forceLandscape = true;
			this.scale.pageAlignHorizontally = true;
		}

	},
	preload: function () {

		// Load assets for showing loading screen to the user...
		this.load.image('progressBar', 'assets/images/progressBar.png');
		this.load.image('preloaderBackground', 'assets/images/preloaderBackground.png');
		this.load.image('battleArenaLogo', 'assets/images/battleArenaLogo.png');


	},
	create: function () {

		// Start loading screen(i.e preloader.js)
		this.state.start('Preloader');
	}
};