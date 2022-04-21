let gameState = {};

// Title screen
class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' })
    }

    preload() {
        this.load.image('WoodyWetlandsSmall', 'assets/sprites/WoodyWetlandsSmall.png');
        this.load.image('DryDryLandsSmall', 'assets/sprites/DryDryLandSmall.png');
    }

    create() {
        // Create the background (the track but darker)
        this.add.rectangle(0, 0, 800, 600, 0x90a4ae).setOrigin(0,0);
        
        // Explanation text
        this.add.text(150, 100, 'Welcome to this racing game!', {fontSize: "30px", fill: "#ffffff"});
        this.add.text(250, 200, 'Select course:', {fontSize: "30px", fill: "#ffffff"});
        
        // Selecting track 1
        this.add.rectangle(155, 255, 160, 160, 0xffffff).setOrigin(0,0);
        gameState.racetrack1 = this.add.image(160, 260, 'WoodyWetlandsSmall').setOrigin(0,0);
        this.add.text(110, 430, 'Woody Wetlands', {fontSize: "30px", fill: "#ffffff"});
        
        // Selecting track 1
        this.add.rectangle(435, 255, 160, 160, 0xffffff).setOrigin(0,0);
        gameState.racetrack2 = this.add.image(440, 260, 'DryDryLandsSmall').setOrigin(0,0);
        this.add.text(410, 430, 'Dry Dry Land', {fontSize: "30px", fill: "#ffffff"});

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
                game.scene.start('WoodyWetlands');
                // Set check to 1 so the code only runs once
                gameState.check = 1;
            }
        });
        
        // Set the image interactive
        gameState.racetrack2.setInteractive();
        
        // Pointerup function for when the user clicks the image
        gameState.racetrack2.on('pointerup', function(){
            // If check is still 0
            if (gameState.check === 0){
                // Stop this scene and start the game scene
                game.scene.stop('StartScene');
                game.scene.start('DryDryLand');
                // Set check to 1 so the code only runs once
                gameState.check = 1;
            }
        });
    }
}