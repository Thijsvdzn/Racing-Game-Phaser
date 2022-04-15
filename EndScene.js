// End screen
class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' })
    }

    preload() {
        this.load.image('background', 'assets/sprites/Map.png');
    }

    create() {
        // Create the background (the track but darker)
        gameState.background = this.add.image(0, 0, 'background').setScale(2).setOrigin(0, 0); 
        gameState.background.alpha = 0.5;
        
        // Explanation text
        this.add.text(400, 400, `${gameState.lapOneTime}\n${gameState.lapTwoTime}\n${gameState.lapThreeTime}\n${gameState.lapFourTime}\n${gameState.lapFiveTime}\nPress enter to go back\to the start screen`, {fontSize: "30px", fill: "#ffffff"});

        // Creates keyboard keys
        gameState.keys = {};

        // Enter button
        gameState.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        // Press Enter to start the game
        if (Phaser.Input.Keyboard.JustDown(gameState.keys.Enter)) {
            this.scene.stop('EndScene');
            this.scene.start('StartScene');
        }
    }
}