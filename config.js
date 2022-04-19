var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            bounce: 0,
            debug: false
        }
    },
    scene: [ StartScene, GameScene, EndScene ]
};

var game = new Phaser.Game(config);