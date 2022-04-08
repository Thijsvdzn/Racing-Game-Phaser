var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    this.load.image('sky', 'assets/sprites/sky.png');
    this.load.image('ground', 'assets/sprites/platform.png');
    this.load.image('star', 'assets/sprites/star.png');
    this.load.image('dude', 'assets/sprites/car.png');
}

//let platforms;
    
function create () {
    // Add the background
    this.add.image(400, 300, 'sky');

    // Add the player    
    player = this.physics.add.sprite(100, 450, 'dude').setScale(.5);

    // Add world bounds collider so the player doesn't go out of bounds
    player.setCollideWorldBounds(true);

    // Add cursors so we can add inputs later
    cursors = this.input.keyboard.createCursorKeys();
        
    // Add collectible stars
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    // Add collider between player and stars    
    this.physics.add.overlap(player, stars, collectStar, null, this);
    
    // Function when the player and a star collide
    function collectStar (player, star) {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
    }
       
    // Add score and score text
    var score = 0;
    var scoreText;
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}

    function update () {
        // Add the variables for movement
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.body.angularVelocity = 0;

        // If left is down
        if (cursors.left.isDown) {
            player.body.angularVelocity = -200;
        } 
        
        // If right is down
        else if (cursors.right.isDown) {
            player.body.angularVelocity = 200;
        }

        // If up is down
        if (cursors.up.isDown) {
            this.physics.velocityFromAngle(player.angle - 90, 300, player.body.velocity);
        } 
    }