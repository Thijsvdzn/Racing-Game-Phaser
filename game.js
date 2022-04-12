var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
        }
    },
    scene: { 
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload () {
    this.load.image('background', 'assets/sprites/Map.png');
    this.load.image('car', 'assets/sprites/car.png');
}

let gameState = {};
    
function create () {
    gameState.background = this.add.image(0, 0, 'background').setScale(2).setOrigin(0, 0);
    
    // Add the player    
    gameState.player = this.physics.add.sprite(100, 450, 'car').setScale(.5);

    // Add world bounds collider so the player doesn't go out of bounds
    gameState.player.setCollideWorldBounds(true);

    // Add cursors so we can add inputs later
    gameState.cursors = this.input.keyboard.createCursorKeys();
        

    // Add collider between player and stars    
    //this.physics.add.overlap(player, stars, collectStar, null, this);
    
    // Function when the player and a star collide
    //function collectStar (player, star) {
        //star.disableBody(true, true);

        //score += 10;
        //scoreText.setText('Score: ' + score);
    //}
       
    // Add score and score text
    //var score = 0;
    //var scoreText;
    //scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    gameState.clockText = this.add.text(10, 10, "00:00", {fontSize: "30px", fill: "#ffffff"});
    gameState.seconds = 0;
    gameState.minutes = 0;
    
    function updateClock() {
        gameState.seconds++;
        if (gameState.seconds === 60){
            gameState.seconds = 0;
            gameState.minutes = 1;
        }
        
        if (gameState.seconds < 10) {
            gameState.clockText.setText(`0${gameState.minutes}:0${gameState.seconds}`);
        } else {
            gameState.clockText.setText(`0${gameState.minutes}:${gameState.seconds}`);
        }
    }
    
    const clock = this.time.addEvent({ delay: 1000, callback: updateClock, callbackScope: this, loop: true });
    
    gameState.speed = 0;
    gameState.speedText = this.add.text(800, 10, `speed: ${gameState.speed}`, {fontSize: "30px", fill: "#ffffff"})
}

    function update () {
        // Add the variables for movement
        gameState.player.body.velocity.x = 0;
        gameState.player.body.velocity.y = 0;
        gameState.player.body.angularVelocity = 0;


        // If left is down
        if (gameState.cursors.left.isDown) {
            gameState.player.body.angularVelocity = -200;
        } 
        
        // If right is down
        else if (gameState.cursors.right.isDown) {
            gameState.player.body.angularVelocity = 200;
        }

        // If up is down
        if (gameState.cursors.up.isDown) {
            if (gameState.speed < 300){
                gameState.speed++;
                gameState.speedText.setText(`speed: ${gameState.speed}`);
            }
        } else {
            if (gameState.speed > 0){
                gameState.speed--;
                gameState.speedText.setText(`speed: ${gameState.speed}`);
            }
        }
        
        this.physics.velocityFromAngle(gameState.player.angle - 90, gameState.speed, gameState.player.body.velocity);
    }


