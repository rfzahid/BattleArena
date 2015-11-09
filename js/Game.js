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

        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.setImpactEvents(true);
        this.stage.backgroundColor = '#999999';

        this.game.physics.p2.gravity.y = 500;
        //this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        //this.game.physics.p2.world.setGlobalStiffness(1e5);
        //this.game.physics.p2.restitution = 1;

        // Ground ledge on which the player will run on it.
        //this.groundLedge = this.game.add.sprite(0, this.game.world.height - 30, 'groundLedge');
        //this.game.physics.p2.enable(this.groundLedge);
        //this.groundLedge.anchor.setTo(0, 0);
        //this.groundLedge.body.kinematic = true;
        //this.groundLedge.body.static = true;

        // Net chord settings...

        this.net = this.game.add.sprite((this.game.world.width / 2) - 5, this.game.world.height - 115, 'net');
        this.game.physics.p2.enable(this.net);
        this.net.body.static = true;

        // Collisions...

        //var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        //var ballCollisionGroup = this.game.physics.p2.createCollisionGroup();

        //this.game.physics.p2.updateBoundsCollisionGroup();

        // Player1 attributes...

        this.player1 = this.game.add.sprite(100, this.game.world.height - 78, 'player');
        this.game.physics.p2.enable(this.player1);
        this.player1.body.fixedRotation = true;
        this.player1.body.setCircle(24);
        this.player1.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player1.animations.add('right', [5, 6, 7, 8], 10, true);
        //this.player1.body.setCollisionGroup(this.playerCollisionGroup);
        //this.player1.body.collides(this.ballCollisionGroup, this.hitBall, this);

        //this.player1.body.collideWorldBounds = true;

        // Player2 attributes...

        this.player2 = this.game.add.sprite(this.game.world.width - 100, this.game.world.height - 115, 'player');
        this.game.physics.p2.enable(this.player2);
        this.player2.body.fixedRotation = true;
        this.player2.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player2.animations.add('right', [5, 6, 7, 8], 10, true);

        // Ball settings...

        this.ball = this.game.add.sprite(200, 200, 'ball');
        //this.ball.anchor.setTo(0, 0);
        this.game.physics.p2.enable(this.ball);
        this.ball.body.setCircle(16);
        //this.ball.smoothed = true;
        this.ball.body.restitution = 0.8;
        this.ball.body.collideWorldBounds = true;
        //this.ball.body.setCollisionGroup(this.ballCollisionGroup);
        //this.ball.body.collides([this.ballCollisionGroup, this.playerCollisionGroup]);

        // Player1 control settings...

        this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        // Player2 control settings...
        this.cursors = this.game.input.keyboard.createCursorKeys();

    },

    hitBall: function (body1, body2) {

    },

    update: function () {

        // Player1 control handling...

        if (this.leftButton.isDown) {
            this.player1.animations.play('left');

            this.player1.body.velocity.x = -300;
            //this.player1.body.thrust(-ACCELERATION);

        } else if (this.rightButton.isDown) {
            this.player1.animations.play('right');

            this.player1.body.velocity.x = 300;
            //this.player1.body.thrust(ACCELERATION);

        } else {
            this.player1.animations.stop();
            this.player1.frame = 4;
            //this.player1.body.acceleration.x = 0;
            this.player1.body.velocity.x = 0;
        }
        if (this.upButton.isDown) {
            this.player1.body.velocity.y = -MAX_SPEED_Y;
        }

        /*if (this.upButton.isDown && this.player1.body.touching.down) {
            //this.player1.body.velocity.y = -MAX_SPEED_Y;
            this.player1.body.moveUp(300);


        }*/

        // Controls for sprite when in the air

        /*if (!this.player1.body.touching.down) {
            if (this.leftButton.isDown) {
                this.player1.frame = 3;
            } else if (this.rightButton.isDown) {
                this.player1.frame = 6;
            }
        }*/

        // Player2 control handling...
        if (this.cursors.left.isDown) {
            this.player2.animations.play('left');

            this.player2.body.velocity.x = -300;
            //this.player1.body.thrust(-ACCELERATION);

        } else if (this.cursors.right.isDown) {
            this.player2.animations.play('right');

            this.player2.body.velocity.x = 300;
            //this.player1.body.thrust(ACCELERATION);

        } else {
            this.player2.animations.stop();
            this.player2.frame = 4;
            //this.player1.body.acceleration.x = 0;
            this.player2.body.velocity.x = 0;
        }
        if (this.cursors.up.isDown) {
            this.player2.body.velocity.y = -MAX_SPEED_Y;
        }
    }

};