let gameState = {};

// Title screen
class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' })
    }

    preload() {
        this.load.image('background', 'assets/sprites/Map.png');
    }

    create() {
        // Create the background (the track but darker)
        gameState.background = this.add.image(0, 0, 'background').setScale(2).setOrigin(0, 0); 
        gameState.background.alpha = 0.5;
        
        // Explanation text
        this.add.text(400, 400, 'Welcome to my racing game\nPress enter to start :)', {fontSize: "30px", fill: "#ffffff"});

        // Creates keyboard keys
        gameState.keys = {};

        // Enter button
        gameState.keys.Enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        // Press Enter to start the game
        if (Phaser.Input.Keyboard.JustDown(gameState.keys.Enter)) {
            this.scene.stop('StartScene');
            this.scene.start('GameScene');
        }
    }
}