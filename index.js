
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('MYCANVAS');
const context = canvas.getContext('2d');

const map =
[
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
];

// WorldData
let cameraXPos = 0.0;
let cameraYPos = 0.0;
let cameraViewAngle = 0.0;


function findGridPosition(cameraX, cameraY) {
    return { x: cameraX % BLOCK_SIZE, y: cameraY % BLOCK_SIZE };
}
function SetupBackground() {
    // setup ceiling and floor
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    context.fillStyle = '#BFBFBF';
    context.fillRect(0, 0, canvasWidth, canvasHeight / 2);
    context.fillStyle = '#8F8F8F';
    context.fillRect(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);
}

SetupBackground();

// Runs Tests
import('./test.js');
