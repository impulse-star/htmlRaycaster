import { drawColumn } from './renderer.js';
import { SetupBackground } from './renderer.js';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('MYCANVAS');
const context = canvas.getContext('2d');

SetupBackground(canvas, context);

drawColumn(canvas, context, 720, 2);
drawColumn(canvas, context, 480, 3);
drawColumn(canvas, context, 360, 4);
drawColumn(canvas, context, 0, 6);

// Runs Tests
import('./test/testIntersections.js');
