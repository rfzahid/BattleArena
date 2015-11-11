// Global variables declared here...

var player1;
var player2;
var cursors;
var groundLedge;
var background;
var net;
var ball;
var jump;
var playerCollisionGroup;
var groundCollisionGroup;
var ballCollisionGroup;
var netCollisionGroup;

var MAX_SPEED_X = 200;
var MAX_SPEED_Y = 500;
var ACCELERATION = 1500;
var MAX_GRAVITY = 1200;

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

        this.game.physics.p2.gravity.y = 1000;
        //this.game.physics.p2.world.defaultContactMaterial.friction = 0.3;
        //this.game.physics.p2.world.setGlobalStiffness(1e5);
        //this.game.physics.p2.restitution = 0.7;
        //this.ballMaterial = thisgame.physics.p2.createMaterial('ballMaterial', this.ball.body);
        //this.groundMaterial = this.game.physics.p2.createMaterial('groundMaterial', this.groundLedge.body);

        // Collisions...

        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.ballCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.groundCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.netCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.physics.p2.updateBoundsCollisionGroup();

        // Ground ledge on which the player will run on it.
        this.groundLedge = this.game.add.sprite(this.game.world.width / 2, this.game.world.height, 'groundLedge');
        this.game.physics.p2.enable(this.groundLedge);
        this.groundLedge.body.kinematic = true;
        //this.groundLedge.body.fixedRotation = true;
        this.groundLedge.body.setCollisionGroup(this.groundCollisionGroup);
        this.groundLedge.body.collides(this.playerCollisionGroup, this.playerGroundCollision, this);
        this.groundLedge.body.collides(this.ballCollisionGroup, this.ballgroundCollision, this);

        // Net chord settings...

        this.net = this.game.add.sprite((this.game.world.width / 2) - 5, this.game.world.height - 115, 'net');
        this.game.physics.p2.enable(this.net);
        this.net.body.static = true;
        this.net.body.setCollisionGroup(this.netCollisionGroup);
        this.net.body.collides(this.ballCollisionGroup, this.netBallCollision, this);
        this.net.body.collides(this.playerCollisionGroup, this.playerNetCollision, this);

        // Create two players...

        this.player1 = this.createPlayer(this.player1, 100, this.game.world.height - 78);
        this.player2 = this.createPlayer(this.player2, this.game.world.width - 100, this.game.world.height - 115);

        // Ball settings...

        this.ball = this.game.add.sprite(200, 200, 'ball');
        //this.ball.anchor.setTo(0, 0);
        this.game.physics.p2.enable(this.ball);
        this.ball.body.setCircle(16);
        //this.ball.smoothed = true;
        this.ball.body.collideWorldBounds = true;
        this.ball.body.setCollisionGroup(this.ballCollisionGroup);
        this.ball.body.collides(this.groundCollisionGroup, this.ballGroundCollision, this);
        this.ball.body.collides(this.playerCollisionGroup, this.playerBallCollision, this);
        this.ball.body.collides(this.netCollisionGroup, this.netBallCollision, this);

        // Player1 control settings...

        this.upButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downButton = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        // Player2 control settings...
        this.cursors = this.game.input.keyboard.createCursorKeys();

    },


    createPlayer: function (player, x, y) {

        this.player = this.game.add.sprite(x, y, 'player');
        this.game.physics.p2.enable(this.player);
        this.player.body.fixedRotation = true;
        this.player.body.setCircle(24);

        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);

        this.player.body.setCollisionGroup(this.playerCollisionGroup);
        this.player.body.collides(this.groundCollisionGroup, this.playerGroundCollision, this);
        this.player.body.collides(this.ballCollisionGroup, this.playerBallCollision, this);
        this.player.body.collides(this.netCollisionGroup, this.playerNetCollision, this);

        this.player.body.collideWorldBounds = true;
        return this.player;
    },

    playerGroundCollision: function (body1, body2) {
        console.log("Player/Ground Collision!");
        //this.jump = true;
    },

    ballGroundCollision: function (body1, body2) {
        console.log("Ball/Ground Collision!");
    },

    playerBallCollision: function (body1, body2) {
        console.log("Player/Ball Collision!");
    },

    netBallCollision: function (body1, body2) {
        console.log("Net/Ball Collision!");
    },

    playerNetCollision: function (body1, body2) {
        console.log("Player/Net Collision");
    },

    touchingDown: function (someone) {
        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;
        for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
            var c = game.physics.p2.world.narrowphase.contactEquations[i]; // cycles through all the contactEquations until it finds our "someone"
            if (c.bodyA === someone.body.data || c.bodyB === someone.body.data) {
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === someone.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }
        return result;
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
        if (this.upButton.isDown && this.touchingDown(this.player1)) {
            this.player1.body.velocity.y = -MAX_SPEED_Y;
        }

        // Controls for sprite when in the air

        if (!this.touchingDown(this.player1)) {
            if (this.leftButton.isDown) {
                this.player1.frame = 3;
            } else if (this.rightButton.isDown) {
                this.player1.frame = 6;
            }
        }

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
            this.player2.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown && this.touchingDown(this.player2)) {
            this.player2.body.velocity.y = -MAX_SPEED_Y;
        }

        if (!this.touchingDown(this.player2)) {
            if (this.cursors.left.isDown) {
                this.player2.frame = 3;
            } else if (this.cursors.right.isDown) {
                this.player2.frame = 6;
            }
        }

    }

};