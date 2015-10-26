BasicGame.Credits = function (game) {

};

BasicGame.Credits.prototype = {
	preload: function () {

	},

	create: function () {
		this.background = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'background');
		this.background.anchor.setTo(0.5);

	},

	update: function () {

	}
};