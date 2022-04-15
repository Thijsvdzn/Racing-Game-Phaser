var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
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