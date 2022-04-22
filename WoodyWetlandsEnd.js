// End screen
class WoodyWetlandsEnd extends Phaser.Scene {
    constructor() {
        super({ key: 'WoodyWetlandsEnd' })
    }

    preload() {
        this.load.image('backgroundWWL', 'assets/sprites/WoodyWetlands.png');
        this.load.audio('victory', 'assets/sounds/Victory.mp3');
    }

    create() {
        // Create the background (the track but darker)
        gameState.background = this.add.image(0, 0, 'backgroundWWL').setScale(1.7).setOrigin(0, 0); 
        gameState.background.alpha = 0.5;
        
        // Play a victory sound
        gameState.victorySound = this.sound.add('victory');
        gameState.victorySound.play({ repeat: 1 });
        
        // Explanation text
        this.add.text(300, 100, `${gameState.lapOneTime}\n${gameState.lapTwoTime}\n${gameState.lapThreeTime}\n${gameState.lapFourTime}\n${gameState.lapFiveTime}`, {fontSize: "30px", fill: "#ffffff"});
        this.add.text(220, 300, `Press enter to go back\nto the start screen`, {fontSize: "30px", fill: "#ffffff"});

        // Creates keyboard keys
        gameState.keys = {};

        // Enter button
        gameState.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        // Press Enter to start the game
        if (Phaser.Input.Keyboard.JustDown(gameState.keys.Enter)) {
            this.scene.stop('WoodyWetlandsEnd');
            this.scene.start('StartScene');
        }
    }
}