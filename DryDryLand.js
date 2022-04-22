class DryDryLand extends Phaser.Scene {
    constructor() {
        super({ key: 'DryDryLand' })
    };

    preload() {
        this.load.image('racetrackDDL', 'assets/sprites/DryDryLand.png');
        this.load.image('car', 'assets/sprites/car.png');
        this.load.image('checkpointV', 'assets/sprites/checkpointV.png');
        this.load.image('checkpointH', 'assets/sprites/checkpointH.png');
        
        this.load.audio('song', 'assets/sounds/StepInsideYourMind.mp3');
        this.load.audio('countdown', 'assets/sounds/countdown.mp3');
    };
    
    create() {
        // Pause all physics until some of the create() code has ran
        this.physics.pause();
        
        // Create the background (AKA the track)
        gameState.racetrackDDL = this.add.image(0, 0, 'racetrackDDL').setScale(5).setOrigin(0, 0);
        
        // Add the player    
        gameState.player = this.physics.add.sprite(1365, 1180, 'car').setScale(.5);
        
        // Add the camera functionalities
        this.cameras.main.setBounds(0, 0, 2500, 2500);
        this.physics.world.setBounds(0, 0, 2500, 2500);
        this.cameras.main.startFollow(gameState.player, true, .5, .5);
        
        // Add world bounds collider so the player doesn't go out of bounds
        gameState.player.setCollideWorldBounds(true);

        // Add cursors so we can add inputs later
        gameState.cursors = this.input.keyboard.createCursorKeys();
        
        // Add every element for the timer
        //gameState.clockText = this.add.text(10, 10, "00:00", {fontSize: "30px", fill: "#ffffff"});
        gameState.seconds = 0;
        gameState.minutes = 0;
    
        // Function to update the clock
        function updateClock() {
            // Adding a second
            gameState.seconds++;
            gameState.lapSeconds++;
        
            // If a minute has pased
            if (gameState.seconds === 60){
                gameState.seconds = 0;
                gameState.minutes++;
            }
        
            // If seconds is only 1 digit
            if (gameState.seconds < 10) {
                // Update the text
                //gameState.clockText.setText(`0${gameState.minutes}:0${gameState.seconds}`);
            } else {
                // Update the text
                //gameState.clockText.setText(`0${gameState.minutes}:${gameState.seconds}`);
            }
            
            if (gameState.lapSeconds > 60) {
                gameState.lapMinutes++;
            }
        }
    
        // Updating the clock every second
        const clock = this.time.addEvent({ delay: 1000, callback: updateClock, callbackScope: this, loop: true });
        
        // Add every element for the countdown at the start of the race
        gameState.countdown = this.add.text(1360, 1080, "3", {fontSize: "30px", fill: "#ffffff"});
        gameState.countdownNumber = 2;
        
        // Pause the timer
        clock.paused = true;
        
        // Function the get the countdown to count down
        function countdownTimer() {
            if (gameState.countdownNumber === 0) {
                // If the number is 0 get rid of it and resume all physics and the clock
                gameState.countdown.text = "";
                clock.paused = false;
                gameState.speed = 0;
                this.physics.resume();
                gameState.gameMusic = this.sound.add('song');
                gameState.gameMusic.play({ loop: true, volume: 0.2 });
            } else {
                // If it's not 0 than update the text and go 1 down
                gameState.countdown.text = `${gameState.countdownNumber}`;
                gameState.countdownNumber--;
            }
        }
        
        gameState.countdownSound = this.sound.add('countdown');
        gameState.countdownSound.play({ repeat: 1 });
        
        // The addEvent function to run the countdownTimer() 2 times
        const countdownFunction = this.time.addEvent({ delay: 1150, callback: countdownTimer, callbackScope: this, repeat: 2 });

        // Every element to make the speed work
        gameState.speed = 0;
        //gameState.speedText = this.add.text(10, 40, `speed: ${gameState.speed}`, {fontSize: "30px", fill: "#ffffff"});
    
        // Every rectangle to make the checkpoint system work
        gameState.finishLine = this.physics.add.sprite( 1320, 1130, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint1 = this.physics.add.sprite( 455, 850, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint2 = this.physics.add.sprite( 2085, 1400, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint3 = this.physics.add.sprite( 360, 1420, 'checkpointH').setOrigin(0,0);
        
        gameState.finishLine.visible = false;
        gameState.checkpoint1.visible = false;
        gameState.checkpoint2.visible = false;
        gameState.checkpoint3.visible = false;
        
        // Every element to make the checkpoint system work
        gameState.checkpoint = 0;
        gameState.lap = 0;
        gameState.lapText = this.add.text(1130, 850, ``, {fontSize: "30px", fill: "#ffffff"});
        
        // Every element to make the lap times work
        //gameState.lapTimesText = this.add.text(770, 10, ``, {fontSize: "30px", fill: "#ffffff"});
        gameState.lapSeconds = 0;
        gameState.lapMinutes = 0;
        gameState.lapOneTime = "";
        gameState.lapTwoTime = "";
        gameState.lapThreeTime = "";
        gameState.lapFourTime = "";
        gameState.lapFiveTime = "";
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
            if (gameState.speed < 400){
                gameState.speed++;
                //gameState.speedText.setText(`speed: ${gameState.speed}`);
            }
        } else {
            if (gameState.speed > 0){
                gameState.speed--;
                //gameState.speedText.setText(`speed: ${gameState.speed}`);
            }
        }
        
        // Move the player forward
        this.physics.velocityFromAngle(gameState.player.angle - 90, gameState.speed, gameState.player.body.velocity);
        
        // Checkpoint system
        this.physics.add.overlap(gameState.player, gameState.finishLine, function() {
            if (gameState.checkpoint === 3){
                // If the checkpoint is 5 (AKA the one before the finish line)
                gameState.checkpoint = 0;
                gameState.lap++;

                    
                // If the lap count is 1 add the lap 1 time
                if (gameState.lap === 1) {
                    if (gameState.lapSeconds > 10){
                        gameState.lapOneTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    } else {
                        gameState.lapOneTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    }
                    gameState.lapText.setText(`Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`);
                    
                // If the lap count is 2 add the lap 2 time
                } else if (gameState.lap === 2) {
                    if (gameState.lapSeconds > 10){
                        gameState.lapTwoTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    } else {
                        gameState.lapTwoTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    }
                    gameState.lapText.setText(`Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`);
                    
                // If the lap count is 3 add the lap three time
                } else if (gameState.lap === 3) {
                    if (gameState.lapSeconds > 10){
                        gameState.lapThreeTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    } else {
                        gameState.lapThreeTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    }
                    gameState.lapText.setText(`Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`);
                    
                // If the lap count is 4 add the lap four time
                } else if (gameState.lap === 4) {
                    if (gameState.lapSeconds > 10){
                        gameState.lapFourTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    } else {
                        gameState.lapFourTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    }
                    gameState.lapText.setText(`Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`);
                    
                // If the lap count is 5 add the lap five time
                } else if (gameState.lap === 5) {
                    if (gameState.lapSeconds > 10){
                        gameState.lapFiveTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    } else {
                        gameState.lapFiveTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`;
                    }
                    gameState.lapText.setText(`Lap ${gameState.lap}: 0${gameState.lapMinutes}:${gameState.lapSeconds}`);
                }
                
                // Reset the lap times to 0 after it has been added to the lap text
                gameState.lapSeconds = 0;
                gameState.lapMinutes = 0;
                
            }
        });
        
        // Add overlap for the first checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint1, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 0){
                gameState.checkpoint = 1;
            }
        });
        
        // Add overlap for the second checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint2, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 1){
                gameState.checkpoint = 2;
            }
        });
        
        // Add overlap for the third checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint3, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 2){
                gameState.checkpoint = 3;
            }
        });
        
        if (gameState.lap === 5){
            gameState.gameMusic.stop();
            this.scene.stop('DryDryLand');
            this.scene.start('DryDryLandEnd');
        }
    };
}