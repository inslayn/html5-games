/*
 * Snake Clone in HTML5
 * Nick McVroom-Amoakohene, Feb 2015
 */

// constants
var CONSTANTS = {
    CANVAS_ID: "snake_game",
    CONTEXT_ID: "2d",
    CANVAS_WIDTH: 640,
    CANVAS_HEIGHT: 640,
    CANVAS_BG_COLOUR: "black",
    
    FPS: 60,
    TIMEOUT_INTERVAL: 1000 / this.FPS,
    
    SNAKE_START_LENGTH: 4
};

// properties
var canvas;
var context;

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

function Snake(start_length) {
    "use strict";
    var i, ni;
    
    snake = {
        length: start_length,
        increase: function () {
            this.length += 1;
        },
        decrease: function () {
            this.length -= 1;
        },
        draw: function () {
            for (i = 0, ni = this.length; i < ni; i += 1) {
                // draw snake
                context.beginPath();
                context.fillStyle = "white";
                context.arc(50 * i, 50, 5, 0, Math.PI * 2, false);
                context.fill();
            }
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

    // set the canvas dimensions
    canvas.width = CONSTANTS.CANVAS_WIDTH;
    canvas.height = CONSTANTS.CANVAS_HEIGHT;

    // set the background colour
    context.fillRect(0, 0, CONSTANTS.CANVAS_WIDTH, CONSTANTS.CANVAS_HEIGHT);
    
    // initialise the snake
    snake = new Snake(CONSTANTS.SNAKE_START_LENGTH);
}
    
function draw() {
    "use strict";
    
    paintCanvas();

    snake.draw();
}

function update() {
    "use strict";
    
    requestAnimFrame(update);
    draw();
}

init();
update();