class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    };

    preload() {
        this.load.image('background', 'assets/sprites/Map.png');
        this.load.image('car', 'assets/sprites/car.png');
        this.load.image('checkpoint', 'assets/sprites/checkpoint.png');
    };
    
    create() {
        this.physics.pause();
        
        // Create the background (AKA the track)
        gameState.background = this.add.image(0, 0, 'background').setScale(2).setOrigin(0, 0);
        
        // Add the player    
        gameState.player = this.physics.add.sprite(100, 450, 'car').setScale(.5);

        // Add world bounds collider so the player doesn't go out of bounds
        gameState.player.setCollideWorldBounds(true);

        // Add cursors so we can add inputs later
        gameState.cursors = this.input.keyboard.createCursorKeys();
        
        
        
        
        
        
        
        
        // Add every element for the timer
        gameState.clockText = this.add.text(10, 10, "00:00", {fontSize: "30px", fill: "#ffffff"});
        gameState.seconds = 0;
        gameState.minutes = 0;
    
        // Function to update the clock
        function updateClock() {
            // Adding a second
            gameState.seconds++;
            gameState.lapTime++;
        
            // If a minute has pased
            if (gameState.seconds === 60){
                gameState.seconds = 0;
                gameState.minutes++;
            }
        
            // If seconds is only 1 digit
            if (gameState.seconds < 10) {
                // Update the text
                gameState.clockText.setText(`0${gameState.minutes}:0${gameState.seconds}`);
            } else {
                // Update the text
                gameState.clockText.setText(`0${gameState.minutes}:${gameState.seconds}`);
            }
        }
    
        // Updating the clock every second
        const clock = this.time.addEvent({ delay: 1000, callback: updateClock, callbackScope: this, loop: true });
        
        
        
        
        
        
        
        gameState.countdown = this.add.text(400, 400, "Hey", {fontSize: "30px", fill: "#ffffff"});
        gameState.countdownNumber = 3;
        
        clock.paused = true;
        
        function countdownTimer() {
            if (gameState.countdownNumber === 0) {
                gameState.countdown.text = "";
                clock.paused = false;
                this.physics.resume();
            } else {
                gameState.countdown.text = `${gameState.countdownNumber}`;
                gameState.countdownNumber--;
            }
        }
        
        const countdownFunction = this.time.addEvent({ delay: 1000, callback: countdownTimer, callbackScope: this, repeat: 3 });

        
        
    
        

        
    
        // Every element to make the speed work
        gameState.speed = 0;
        gameState.speedText = this.add.text(10, 40, `speed: ${gameState.speed}`, {fontSize: "30px", fill: "#ffffff"});
    
        // Every rectangle to make the checkpoint system work
        gameState.finishLine = this.physics.add.sprite(50, 475, 'checkpoint').setOrigin(0,0);
        gameState.finishLine.setImmovable = true;
        gameState.checkpoint1 = this.physics.add.sprite(790, 170, 'checkpoint').setOrigin(0,0);
        gameState.checkpoint2 = this.physics.add.sprite(800, 660, 'checkpoint').setOrigin(0,0);
        gameState.checkpoint = 0;
        gameState.lap = 0;
        gameState.checkpointDebug = this.add.text(10, 70, `checkpoint: ${gameState.checkpoint}`, {fontSize: "30px", fill: "#ffffff"});
        gameState.lapDebug = this.add.text(10, 100, `lap: ${gameState.lap}`, {fontSize: "30px", fill: "#ffffff"});
        gameState.lapTimesText = this.add.text(770, 10, ``, {fontSize: "30px", fill: "#ffffff"});
    
        gameState.lapTime = 0;
    };

    update() {
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
        
        // Move the player forward
        this.physics.velocityFromAngle(gameState.player.angle - 90, gameState.speed, gameState.player.body.velocity);
        
        // Checkpoint system
        this.physics.add.overlap(gameState.player, gameState.finishLine, function() {
            if (gameState.checkpoint === 2){
                gameState.checkpoint = 0;
                gameState.lap++;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
                gameState.lapDebug.setText(`lap: ${gameState.lap}`);
                if (gameState.lapTimesText.text === '' && gameState.lapTime < 10){
                    gameState.lapTimesText.setText(`Lap ${gameState.lap}: 0${gameState.minutes}:0${gameState.lapTime}`);
                } else if (gameState.lapTimesText.text === '' && gameState.lapTime >= 10) {
                    
                    gameState.lapTimesText.setText(`${gameState.lapTimesText.text}Lap ${gameState.lap}: 0${gameState.minutes}:${gameState.lapTime}`);
                } else if (gameState.lapTimesText.text != '' && gameState.lapTime < 10) {
                    gameState.lapTimesText.setText(`${gameState.lapTimesText.text}\nLap ${gameState.lap}: 0${gameState.minutes}:0${gameState.lapTime}`);
                } else if (gameState.lapTimesText.text != '' && gameState.lapTime >= 10) {
                    gameState.lapTimesText.setText(`${gameState.lapTimesText.text}\nLap ${gameState.lap}: 0${gameState.minutes}:${gameState.lapTime}`);
                }
                
                gameState.lapTime = 0;
                
            }
        });
        
        this.physics.add.overlap(gameState.player, gameState.checkpoint1, function() {
            if (gameState.checkpoint === 0){
                gameState.checkpoint = 1;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        this.physics.add.overlap(gameState.player, gameState.checkpoint2, function() {
            if (gameState.checkpoint === 1){
                gameState.checkpoint = 2;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
    };
}