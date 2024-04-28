const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

// Variables
let shark, fish, cave, cursors, textScore;
let score = 0; // Initialize score outside function
let hasFish = false; // Flag to track fish collection
let lastFishAlertTime = 0; // Timestamp for last fish alert
let background; // Background Variable    

// Load Game Assets
function preload() {
    this.load
        .image("shark", "/assets/character/shark.png")
        .image("fish", "/assets/object/fish.png")
        .image("background", "/assets/background/background.png")
        .image("cave", "/assets/cave/cave.png")
}

// Create Game Objects and Settings
function create() {

    // Background Image
    background = this.add.image(0, 0, "background").setOrigin(0, 0);

    // Scale Background Image to Fit Screen
    resizeBackground();

    // Sprites with Physiscs
    shark = this.physics.add.sprite(0, 900, "shark").setBounce(0).setCollideWorldBounds(true).setScale(0.5);
    fish = this.physics.add.sprite(350, 480, "fish").setScale(0.2);

    // Cave
    cave = this.add.image(650, 480, "cave").setScale(0.5); 

    // Score Text
    const style = { font: "50px Courier New", fill: "#FFFB03" };
    textScore = this.add.text(50, 30, "Fish Collected: " + score, style);

    cursors = this.input.keyboard.createCursorKeys();

    this.scale.on('resize', resizeBackground, this);

}

function resizeBackground() {
    const { width, height } = game.scale.gameSize;
    const scaleX = width / background.width;
    const scaleY = height / background.height;
    background.setScale(scaleX, scaleY);
}

function update() {
        // Handle Shark Movement
        if (cursors.left.isDown) {
            shark.setVelocityX(-160);
            shark.flipX = true;
        } else if (cursors.right.isDown) {
            shark.setVelocityX(160);
            shark.flipX = false;
        } else {
            shark.setVelocityX(0);
        }

        // Handle Fish Collection
        this.physics.add.overlap(shark, fish, () => {
            if (!hasFish) {
                hasFish = true;
                fish.disableBody(true, true);
                alert("Fish Collected! Bring it back to the Cave!")
            }
        });

        // Handle Returning Fish to Cave
        if (hasFish && shark.x > 500) {
            score += 500;
            textScore.setText("Fish Collected: " + score);
            shark.disableBody(true, true);
            alert("YOU WIN!\n You collected all the Fish!")
            hasFish = false;
        }
}


