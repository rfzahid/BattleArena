var player;
var cursors;
var star;
var groundLedge;
var platforms;
var platform;
var MAX_SPEED_X = 200;
var MAX_SPEED_Y = 700;
var ACCELERATION = 1500;
var MAX_GRAVITY = 1200;
var BOUNCE = 0.2;
var DRAG = 600;

BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

	preload: function () {
		// Load assets for gameplay
		this.game.load.spritesheet('player', 'assets/images/player.png', 32, 48);
		this.game.load.image('star', 'assets/images/star.png');
		this.game.load.image('groundLedge', 'assets/images/groundLedge.png');
		this.game.load.image('platform', 'assets/images/platform.png');

	},

	addPlatform: function (x, y) {
		var temp;
		this.temp = this.platforms.create(x, y, 'platform');
		this.temp.body.immovable = true;

	},

	create: function () {

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		// Background image
		//this.background = this.game.add.tileSprite(0, 0, 1920, 1920, 'background');
		this.world.setBounds(0, 0, 2920, 800);
		// Ground ledge on which the player will run on it.
		this.groundLedge = this.game.add.sprite(0, 770, 'groundLedge');
		this.groundLedge.scale.setTo(3);
		this.game.physics.arcade.enable(this.groundLedge);
		this.groundLedge.body.immovable = true;

		// Loading Platforms...
		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;

		this.addPlatform(600, 600);
		this.addPlatform(800, 400);
		this.addPlatform(1000, 500);

		// Player attributes...
		this.player = this.game.add.sprite(0, 700, 'player');
		this.game.physics.arcade.enable(this.player);
		this.player.body.bounce.y = BOUNCE;
		this.player.body.gravity.y = MAX_GRAVITY;
		this.player.body.maxVelocity.setTo(MAX_SPEED_X, MAX_SPEED_Y);
		this.player.body.drag.setTo(DRAG, 0);
		this.player.body.collideWorldBounds = true;

		this.player.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player.animations.add('right', [5, 6, 7, 8], 10, true);

		for (var i = 0; i < 40; i++) {
			this.star = this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'star');
		}

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.camera.follow(this.player);

	},

	update: function () {

		this.game.physics.arcade.collide(this.player, this.groundLedge);
		this.game.physics.arcade.collide(this.player, this.platforms);

		if (this.cursors.left.isDown) {
			this.player.animations.play('left');
			this.player.body.acceleration.x = -ACCELERATION;

		} else if (this.cursors.right.isDown) {
			this.player.animations.play('right');
			this.player.body.acceleration.x = ACCELERATION;

		} else {
			this.player.animations.stop();
			this.player.frame = 4;
			this.player.body.acceleration.x = 0;
		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.body.velocity.y = -MAX_SPEED_Y;


		}

		// Controls for sprite when in the air
		if (!this.player.body.touching.down) {
			if (this.cursors.left.isDown) {
				this.player.frame = 3;
			} else if (this.cursors.right.isDown) {
				this.player.frame = 6;
			}
		}

	},

	render: function () {
		this.game.debug.cameraInfo(this.game.camera, 32, 32);
		this.game.debug.spriteCoords(this.player, 32, 200);
	}
};