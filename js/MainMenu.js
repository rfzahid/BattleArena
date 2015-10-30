// Global variables declared here...

var music;
var playButton;
var options;
var credits;

BasicGame.MainMenu = function (game) {
	this.music = null;
	this.playButton = null;
};

BasicGame.MainMenu.prototype = {

	preload: function () {

	},

	create: function () {

		// Adding items for Main Menu here...
		this.preloaderBackground = this.add.image(this.game.world.centerX, this.game.world.centerY, 'preloaderBackground');
		this.preloaderBackground.anchor.setTo(0.5);

		// Music settings here...
		this.music = this.add.audio('titleMusic');
		this.music.loop = true;
		this.music.play();

		// Buttons needed for navigation

		this.playButton = this.add.button(this.game.world.centerX, 200, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');
		this.playButton.anchor.setTo(0.5);
		this.options = this.add.button(this.game.world.centerX, 300, 'options', this.startOptions, this, 'buttonOver', 'buttonOut', 'buttonOver');
		this.options.anchor.setTo(0.5);
		this.credits = this.add.button(this.game.world.centerX, 400, 'credits', this.startCredits, this, 'buttonOver', 'buttonOut', 'buttonOver');
		this.credits.anchor.setTo(0.5);
		this.credits.scale.setTo(0.5, 0.5);



	},

	update: function () {

	},

	// Start the actual game to play
	startGame: function () {
		this.music.stop();
		this.state.start('Game');
	},

	// Start Options menu
	startOptions: function () {
		this.music.stop();
		this.state.start('Options');
	},

	// Start Credits menu
	startCredits: function () {
		this.music.stop();
		this.state.start('Credits');
	}
};