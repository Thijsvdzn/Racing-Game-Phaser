class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' })
    };

    preload() {
        this.load.image('racetrack', 'assets/sprites/racetrack.png');
        this.load.image('car', 'assets/sprites/car.png');
        this.load.image('checkpointV', 'assets/sprites/checkpointV.png');
        this.load.image('checkpointH', 'assets/sprites/checkpointH.png');
    };
    
    create() {
        // Pause all physics until some of the create() code has ran
        this.physics.pause();
        
        // Create the background (AKA the track)
        gameState.racetrack = this.add.image(0, 0, 'racetrack').setScale(5).setOrigin(0, 0);
        
        // Add the player    
        gameState.player = this.physics.add.sprite(572, 1300, 'car').setScale(.5);
        
        // Add the camera functionalities
        this.cameras.main.setBounds(0, 0, 2500, 2500);
        this.physics.world.setBounds(0, 0, 2500, 2500);
        this.cameras.main.startFollow(gameState.player, true, .5, .5);
        
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
            gameState.lapSeconds++;
        
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
            
            if (gameState.lapSeconds > 60) {
                gameState.lapMinutes++;
            }
        }
    
        // Updating the clock every second
        const clock = this.time.addEvent({ delay: 1000, callback: updateClock, callbackScope: this, loop: true });
        
        // Add every element for the countdown at the start of the race
        gameState.countdown = this.add.text(400, 400, "3", {fontSize: "30px", fill: "#ffffff"});
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
            } else {
                // If it's not 0 than update the text and go 1 down
                gameState.countdown.text = `${gameState.countdownNumber}`;
                gameState.countdownNumber--;
            }
        }
        
        // The addEvent function to run the countdownTimer() 2 times
        const countdownFunction = this.time.addEvent({ delay: 1000, callback: countdownTimer, callbackScope: this, repeat: 2 });

        // Every element to make the speed work
        gameState.speed = 0;
        gameState.speedText = this.add.text(10, 40, `speed: ${gameState.speed}`, {fontSize: "30px", fill: "#ffffff"});
    
        // Every rectangle to make the checkpoint system work
        gameState.finishLine = this.physics.add.sprite( 525, 1230, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint1 = this.physics.add.sprite( 525, 1000, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint2 = this.physics.add.sprite( 750, 740, 'checkpointV').setOrigin(0,0);
        gameState.checkpoint3 = this.physics.add.sprite( 1000, 500, 'checkpointV').setOrigin(0,0);
        gameState.checkpoint4 = this.physics.add.sprite( 1460, 750, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint5 = this.physics.add.sprite( 1650, 1100, 'checkpointV').setOrigin(0,0);
        gameState.checkpoint6 = this.physics.add.sprite( 1940, 1400, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint7 = this.physics.add.sprite( 1650, 1630, 'checkpointV').setOrigin(0,0);
        gameState.checkpoint8 = this.physics.add.sprite( 1095, 1780, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint9 = this.physics.add.sprite( 670, 1820, 'checkpointV').setOrigin(0,0);
        gameState.checkpoint10 = this.physics.add.sprite( 525, 1700, 'checkpointH').setOrigin(0,0);
        gameState.checkpoint11 = this.physics.add.sprite( 525, 1500, 'checkpointH').setOrigin(0,0);
        
        gameState.finishLine.visible = false;
        gameState.checkpoint1.visible = false;
        gameState.checkpoint2.visible = false;
        gameState.checkpoint3.visible = false;
        gameState.checkpoint4.visible = false;
        gameState.checkpoint5.visible = false;
        gameState.checkpoint6.visible = false;
        gameState.checkpoint7.visible = false;
        gameState.checkpoint8.visible = false;
        gameState.checkpoint9.visible = false;
        gameState.checkpoint10.visible = false;
        gameState.checkpoint11.visible = false;
        
        // Every element to make the checkpoint system work
        gameState.checkpoint = 0;
        gameState.lap = 0;
        gameState.checkpointDebug = this.add.text(10, 70, `checkpoint: ${gameState.checkpoint}`, {fontSize: "30px", fill: "#ffffff"});
        gameState.lapDebug = this.add.text(10, 100, `lap: ${gameState.lap}`, {fontSize: "30px", fill: "#ffffff"});
        
        // Every element to make the lap times work
        //gameState.lapTimesText = this.add.text(770, 10, ``, {fontSize: "30px", fill: "#ffffff"});
        gameState.lapSeconds = 0;
        gameState.lapMinutes = 0;
        gameState.lapOneTime = "";
        gameState.lapTwoTime = "";
        gameState.lapThreeTime = "";
        gameState.lapFourTime = "";
        gameState.lapFiveTime = "";
        // WIP
        gameState.fastestLap = [];
        
        // Make text sticky ////// WIPPPP
        //this.cameras.main.ignore( [gameState.countdown, gameState.speed, gameState.clockText, gameState.checkpointDebug, gameState.lapDebug] );
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
            if (gameState.checkpoint === 11){
                // If the checkpoint is 11 (AKA the one before the finish line)
                gameState.checkpoint = 0;
                gameState.lap++;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
                gameState.lapDebug.setText(`lap: ${gameState.lap}`);

                    
                // If the lap count is 1 add the lap 1 time
                if (gameState.lap === 1) {
                    gameState.lapOneTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:0${gameState.lapSeconds}`;
                    
                // If the lap count is 2 add the lap 2 time
                } else if (gameState.lap === 2) {
                    gameState.lapTwoTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:0${gameState.lapSeconds}`;
                    
                // If the lap count is 3 add the lap three time
                } else if (gameState.lap === 3) {
                    gameState.lapThreeTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:0${gameState.lapSeconds}`;
                    
                // If the lap count is 4 add the lap four time
                } else if (gameState.lap === 4) {
                    gameState.lapFourTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:0${gameState.lapSeconds}`;
                    
                // If the lap count is 5 add the lap five time
                } else if (gameState.lap === 5) {
                    gameState.lapFiveTime = `Lap ${gameState.lap}: 0${gameState.lapMinutes}:0${gameState.lapSeconds}`;
                }
                
                // Debug lap times text
                /*if (gameState.lapTimesText.text === '' && gameState.lapTime < 10){
                    // If the lap text is still empty and the lap is less than 10 seconds long
                    gameState.lapTimesText.setText(`Lap ${gameState.lap}: 0${gameState.minutes}:0${gameState.lapTime}`);
                } else if (gameState.lapTimesText.text === '' && gameState.lapTime >= 10) {
                    // If the lap text is still empty and the lap is more than 10 seconds long
                    gameState.lapTimesText.setText(`${gameState.lapTimesText.text}Lap ${gameState.lap}: 0${gameState.minutes}:${gameState.lapTime}`);
                } else if (gameState.lapTimesText.text != '' && gameState.lapTime < 10) {
                    // If the lap text is already filled and the lap is less than 10 seconds long
                    gameState.lapTimesText.setText(`${gameState.lapTimesText.text}\nLap ${gameState.lap}: 0${gameState.minutes}:0${gameState.lapTime}`);
                } else if (gameState.lapTimesText.text != '' && gameState.lapTime >= 10) {
                    // If the lap text is already filled and the lap is more than 10 seconds long
                    gameState.lapTimesText.setText(`${gameState.lapTimesText.text}\nLap ${gameState.lap}: 0${gameState.minutes}:${gameState.lapTime}`);
                }*/
                
                // Reset the lap times to 0 after it has been added to the lap text
                gameState.lapSeconds = 0;
                gameState.lapMinutes = 0;
                console.log("Finish Line reached");
                
            }
        });
        
        // Add overlap for the first checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint1, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 0){
                gameState.checkpoint = 1;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the second checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint2, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 1){
                gameState.checkpoint = 2;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the third checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint3, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 2){
                gameState.checkpoint = 3;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the fourth checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint4, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 3){
                gameState.checkpoint = 4;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the fifth checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint5, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 4){
                gameState.checkpoint = 5;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the sixth checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint6, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 5){
                gameState.checkpoint = 6;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the seventh checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint7, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 6){
                gameState.checkpoint = 7;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the eight checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint8, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 7){
                gameState.checkpoint = 8;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the ninth checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint9, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 8){
                gameState.checkpoint = 9;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the tenth checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint10, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 9){
                gameState.checkpoint = 10;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        // Add overlap for the eleventh checkpoint
        this.physics.add.overlap(gameState.player, gameState.checkpoint11, function() {
            // A check to see that the player didn't skip a checkpoint
            if (gameState.checkpoint === 10){
                gameState.checkpoint = 11;
                gameState.checkpointDebug.setText(`checkpoint: ${gameState.checkpoint}`);
            }
        });
        
        if (gameState.lap === 5){
            this.scene.stop('GameScene');
            this.scene.start('EndScene');
        }
    };
}