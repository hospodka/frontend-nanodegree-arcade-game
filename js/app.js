//The below code is the players, enemies and rules for my "The Frogger" arcade game.

// Enemies our player must avoid
var Enemy = function(startX, startY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time detlta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        // Initial enemy x-axis position
        this.x = -60;
        this.randomSpeed();
    }
    var bugXLeftRange = this.x - 50;
    var bugXRightRange = this.x + 50;
    var bugYTopRange = this.y - 50;
    var bugYBottomRange = this.y + 50;

    if (player.x > bugXLeftRange && player.x < bugXRightRange && player.y > bugYTopRange && player.y < bugYBottomRange) {
        player.resetPlayerPosition();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 5 + 1);
    this.speed = 60 * speedMultiply;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var playerStartX = 200,
    playerStartY = 400;

var Player = function() {
    // Player initial position
    this.x = playerStartX;
    this.y = playerStartY;
    this.wallChecker = {
        leftWall: false,
        rightWall: false,
        bottomWall: true
    };
    this.sprite = 'images/char-boy.png';
};

// Player class instance methods
Player.prototype.update = function() {

};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayerPosition = function() {
    this.x = playerStartX;
    this.y = playerStartY;
    this.resetCheckPosition();
};

Player.prototype.handleInput = function(direction) {
    // Checks if input for player is into a wall.
    var stepHorizontalLength = 100;
    var stepVerticalLength = 90;
    this.checkPosition();

    if (direction === 'left') {
        if (this.wallChecker.leftWall) {
            return null;
        }
        this.x -= stepHorizontalLength;
    } else if (direction === 'right') {
        if (this.wallChecker.rightWall) {
            return null;
        }
        this.x += stepHorizontalLength;
    } else if (direction === 'up') {
        if (this.y === 40) {
            this.resetPlayerPosition();
            return null;
        }
        this.y -= stepVerticalLength;
    } else if (direction === 'down') {
        if (this.wallChecker.bottomWall) {
            return null;
        }
        this.y += stepVerticalLength;
    } else {
        console.log('>>> WRONG KEY');
        return null;
    }
};

Player.prototype.checkPosition = function() {
    if (this.x === 0) {
        this.setHorizontalWallCheckerState(true, false);
    } else if (this.x === 400) {
        this.setHorizontalWallCheckerState(false, true);
    } else {
        this.setHorizontalWallCheckerState(false, false);
    }
    if (this.y === 400) {
        this.wallChecker.bottomWall = true;
    } else {
        this.wallChecker.bottomWall = false;
    }
};

Player.prototype.resetCheckPosition = function() {
    this.setHorizontalWallCheckerState(false, false);
    this.wallChecker.bottomWall = true;
};

Player.prototype.setHorizontalWallCheckerState = function(leftWallState, rightWallState) {
    this.wallChecker.leftWall = leftWallState;
    this.wallChecker.rightWall = rightWallState;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Create instance for all enemies
for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var keyPressed = allowedKeys[e.keyCode];
    player.handleInput(keyPressed);
});

// HELPER Function
var LogPlayerPosition = function() {
    console.log('>>> PLAYER - X: ' + player.x + ' Y: ' + player.y + ' ' + player.wallChecker.leftWall + " " + player.wallChecker.rightWall);
};