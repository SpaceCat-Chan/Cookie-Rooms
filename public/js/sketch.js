let cookie;
let players = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    cookie = new Cookie();
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    cookie.pos.x = width / 2;
    cookie.pos.y = height / 6;
}

function draw() {
    background(255);
    cookie.draw();
    for (var i in players) {
        players[i].draw();
    }

    realtimeUpdate();
}

//All of the games classes ->>

function Cookie() {
    this.pos = createVector(width / 2, height / 6);
    this.radius = 100;
    this.worth = 0;

    this.draw = function() {
        fill(255, 224, 23);
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
        fill(0);
        textSize(40);
        textAlign(CENTER);
        text(this.worth, this.pos.x, this.pos.y - this.radius);
    };
}

function Player(x, y) {
    this.pos = createVector(x, y);
    this.radius = 10;

    this.draw = function() {
        fill("red");
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    };
}
