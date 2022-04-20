let gameState = {};

// Title screen
class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' })
    }

    preload() {
        this.load.image('cutoutRacetrack', 'assets/sprites/smallRacetrack.png');
    }

    create() {
        // Create the background (the track but darker)
        this.add.rectangle(0, 0, 800, 600, 0x33691e).setOrigin(0,0);
        
        // Explanation text
        this.add.text(150, 100, 'Welcome to this racing game!', {fontSize: "30px", fill: "#ffffff"});
        this.add.text(250, 200, 'Select course:', {fontSize: "30px", fill: "#ffffff"});
        
        // Selecting a track text
        this.add.rectangle(295, 255, 160, 160, 0xffffff).setOrigin(0,0);
        gameState.racetrack1 = this.add.image(300, 260, 'cutoutRacetrack').setOrigin(0,0);
        this.add.text(285, 430, 'Racetrack 1', {fontSize: "30px", fill: "#ffffff"});

        // Making a variable to only run the stop and start scene once later
        gameState.check = 0;
    }

    update() {
        // Set the image interactive
        gameState.racetrack1.setInteractive();
        
        // Pointerup function for when the user clicks the image
        gameState.racetrack1.on('pointerup', function(){
            // If check is still 0
            if (gameState.check === 0){
                // Stop this scene and start the game scene
                game.scene.stop('StartScene');
                game.scene.start('GameScene');
                // Set check to 1 so the code only runs once
                gameState.check = 1;
            }
        });
    }
}