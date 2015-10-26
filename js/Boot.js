var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

	init: function () {

		this.input.maxPointers = 1;
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
		this.load.image('progressBar', 'assets/images/progressBar.png');
		this.load.image('preloaderBackground', 'assets/images/preloaderBackground.png');
		this.load.image('battleArenaLogo', 'assets/images/battleArenaLogo.png');


	},
	create: function () {
		this.state.start('Preloader');
	}
};