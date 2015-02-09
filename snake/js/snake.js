/*
 * Snake Clone in HTML5
 * Nick McVroom-Amoakohene, Feb 2015
 */

function Point(x, y) {
    "use strict";
    this.x = x;
    this.y = y;
}

// constants
var CONSTANTS = {
    CANVAS_ID: "snake_game",
    CONTEXT_ID: "2d",
    CANVAS_WIDTH: 640,
    CANVAS_HEIGHT: 640,
    CANVAS_BG_COLOUR: "black",
    
    FPS: 60,
    TIMEOUT_INTERVAL: 1000 / this.FPS,
    
    SNAKE_START_LENGTH: 4,
    SNAKE_START_POSITION: new Point(25, 25),
    SNAKE_SEGMENT_RADIUS: 5
};

// properties
var canvas;
var context;
var lastDownTarget;

var snake;

function setupRequestAnimationFrame() {
    "use strict";
    // RequestAnimFrame, a browser API for getting smooth animations
    window.requestAnimFrame = (
        function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, CONSTANTS.TIMEOUT_INTERVAL);
                };
        }()
    );
}

function onKeyUp(event) {
    "use strict";
//    snake.speed = new Point(0.1, 0);
    if (lastDownTarget === canvas) {
        switch (event.keyCode) {
        case 38:
            // Up
        case 87:
            // W
            snake.speed(new Point(0, -0.1));
            break;
        case 40:
            // Down
        case 83:
            // S
            snake.speed(new Point(0, 0.1));
            break;
        case 37:
            // Left
        case 65:
            // A
            snake.speed(new Point(-0.1, 0));
            break;
        case 39:
            // Right
        case 68:
            // D
            snake.speed(new Point(0.1, 0));
            break;
        }
    }
}

function setupEventListeners() {
    "use strict";
    canvas.addEventListener("keyup", onKeyUp, true);
}

function Segment(x, y, radius) {
    "use strict";
    this.xPos = x; 
    this.yPos = y; 
    
    this.lastPosition = new Point(x, y);
    
    this.move = function (deltaX, deltaY) {
        this.xPos += deltaX;
        this.yPos += deltaY;
        
        this.lastPosition = new Point(this.xPos, this.yPos);
    };
    
    this.draw = function () {
        context.beginPath();
        context.fillStyle = "white";
        context.arc(this.xPos, this.yPos, radius, 0, Math.PI * 2, false);
        context.fill();
    };
}

function Snake(start_length, start_position) {
    "use strict";
    var i, ni;
    
    this.segments = [];
    this.deltaX = 0;
    this.deltaY = 0;
    
    this.length = start_length;
    
    for (i = this.length - 1, ni = 0; i >= ni; i -= 1) {
        this.segments[i] = new Segment(start_position.x + 
                                       (CONSTANTS.SNAKE_SEGMENT_RADIUS * 2) * (this.length - i),
                                       start_position.y, CONSTANTS.SNAKE_SEGMENT_RADIUS);
    }
    
    this.increase = function () {
        this.length += 1;
    };
        
    this.decrease = function () {
        this.length -= 1;
    };
    
    this.speed = function (delta) {
        this.deltaX = delta.x;
        this.deltaY = delta.y;
    };
    
    this.draw = function () {
        for (i = 0, ni = this.length; i < ni; i += 1) {
            // draw snake
            this.segments[i].draw();
        }
    };
    
    this.update = function () {
        this.segments[0].move(this.deltaX, this.deltaY);
        
        for (i = 1, ni = this.length; i < ni; i += 1) {
            this.segments[i].move(this.segments[i].currentPosition,
                                  this.segments[i - 1].currentPosition,
                                  this.deltaX,
                                  this.deltaY);
        }
    };
}

function paintCanvas() {
    "use strict";
    
    context.fillStyle = CONSTANTS.CANVAS_BG_COLOUR;
    context.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
}

function init() {
    "use strict";
    
    setupRequestAnimationFrame();
    
    // grab the canvas
    canvas = document.getElementById(CONSTANTS.CANVAS_ID);

    // grab the context
    context = canvas.getContext(CONSTANTS.CONTEXT_ID);

    window.onload = function () {
        document.addEventListener("mousedown", function (event) {
            lastDownTarget = event.target;
        }, false);
    };
    
    // set the canvas dimensions
    canvas.width = CONSTANTS.CANVAS_WIDTH;
    canvas.height = CONSTANTS.CANVAS_HEIGHT;

    // set the background colour
    context.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    
    // initialise the snake
    snake = new Snake(CONSTANTS.SNAKE_START_LENGTH, CONSTANTS.SNAKE_START_POSITION);
    
    setupEventListeners();
}
    
function draw() {
    "use strict";
    
    requestAnimFrame(draw);
    paintCanvas();

    snake.draw();
}

function update() {
    "use strict";
    
    requestAnimFrame(update);
    snake.update();
}

init();
update();
draw();