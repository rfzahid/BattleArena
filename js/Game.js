// Global variables declared here...

var player1;
var player2;
var cursors;
var star;
var groundLedge;
var background;
var net;
var ball;

var MAX_SPEED_X = 200;
var MAX_SPEED_Y = 500;
var ACCELERATION = 1500;
var MAX_GRAVITY = 1200;
var BOUNCE = 0.2;
var DRAG = 600;

var upButton;
var downButton;
var leftButton;
var rightButton;

BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {

	preload: function () {

	},

	create: function () {

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.stage.backgroundColor = '#999999';

		// Ground ledge on which the player will run on it.
		this.groundLedge = this.game.add.sprite(0, this.game.world.height - 30, 'groundLedge');
		this.game.physics.arcade.enable(this.groundLedge);
		this.groundLedge.body.immovable = true;

		// Net chord settings...
		this.net = this.game.add.sprite((this.game.world.width / 2) - 5, this.game.world.height - 230, 'net');
		this.game.physics.arcade.enable(this.net);
		this.net.body.immovable = true;

		// Player1 attributes...

		this.player1 = this.game.add.sprite(100, this.game.world.height - 100, 'player');
		this.game.physics.arcade.enable(this.player1);
		this.player1.body.bounce.y = BOUNCE;
		this.player1.body.gravity.y = MAX_GRAVITY;
		this.player1.body.maxVelocity.setTo(MAX_SPEED_X, MAX_SPEED_Y);
		this.player1.body.drag.setTo(DRAG, 0);
		this.player1.body.collideWorldBounds = true;

		this.player1.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player1.animations.add('right', [5, 6, 7, 8], 10, true);

		// Player2 attributes...

		this.player2 = this.game.add.sprite(1000, this.game.world.height - 100, 'player');
		this.game.physics.arcade.enable(this.player2);
		this.player2.body.bounce.y = BOUNCE;
		this.player2.body.gravity.y = MAX_GRAVITY;
		this.player2.body.maxVelocity.setTo(MAX_SPEED_X, MAX_SPEED_Y);
		this.player2.body.drag.setTo(DRAG, 0);
		this.player2.body.collideWorldBounds = true;

		this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
		this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

		// Ball settings...

		this.ball = this.game.add.sprite(200, 200, 'ball');
		this.ball.scale.setTo(0.5, 0.5);
		this.game.physics.arcade.enable(this.ball);
		this.ball.body.gravity.y = MAX_GRAVITY;
		this.ball.body.bounce.y = 1;
		this.ball.body.collideWorldBounds = true;

		// Player1 control settings...

		this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
		this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

		// Player2 control settings...
		this.cursors = this.game.input.keyboard.createCursorKeys();

	},

	update: function () {

		// Handling collisions here...

		this.game.physics.arcade.collide(this.player1, this.groundLedge);
		this.game.physics.arcade.collide(this.player1, this.net);
		this.game.physics.arcade.collide(this.player1, this.ball);

		this.game.physics.arcade.collide(this.player2, this.groundLedge);
		this.game.physics.arcade.collide(this.player2, this.net);
		this.game.physics.arcade.collide(this.player2, this.ball);

		this.game.physics.arcade.collide(this.ball, this.groundLedge);
		this.game.physics.arcade.collide(this.ball, this.net);

		// Player1 control handling...

		if (this.leftButton.isDown) {
			this.player1.animations.play('left');
			this.player1.body.acceleration.x = -ACCELERATION;

		} else if (this.rightButton.isDown) {
			this.player1.animations.play('right');
			this.player1.body.acceleration.x = ACCELERATION;

		} else {
			this.player1.animations.stop();
			this.player1.frame = 4;
			this.player1.body.acceleration.x = 0;
			//this.player.body.velocity.x = 0;
		}

		if (this.upButton.isDown && this.player1.body.touching.down) {
			this.player1.body.velocity.y = -MAX_SPEED_Y;


		}

		// Controls for sprite when in the air

		if (!this.player1.body.touching.down) {
			if (this.leftButton.isDown) {
				this.player1.frame = 3;
			} else if (this.rightButton.isDown) {
				this.player1.frame = 6;
			}
		}

		// Player2 control handling...

		if (this.cursors.left.isDown) {
			this.player2.animations.play('left');
			this.player2.body.acceleration.x = -ACCELERATION;

		} else if (this.cursors.right.isDown) {
			this.player2.animations.play('right');
			this.player2.body.acceleration.x = ACCELERATION;

		} else {
			this.player2.animations.stop();
			this.player2.frame = 4;
			this.player2.body.acceleration.x = 0;
		}

		if (this.cursors.up.isDown && this.player2.body.touching.down) {
			this.player2.body.velocity.y = -MAX_SPEED_Y;


		}

		// Controls for sprite when in the air

		if (!this.player2.body.touching.down) {
			if (this.cursors.left.isDown) {
				this.player2.frame = 3;
			} else if (this.cursors.right.isDown) {
				this.player2.frame = 6;
			}
		}


	}
};