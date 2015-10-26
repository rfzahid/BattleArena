BasicGame.Options = function (game) {

};

BasicGame.Options.prototype = {

	preload: function () {

	},

	create: function () {
		this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
		this.background.anchor.setTo(0.5);
	},

	update: function () {

	}
};