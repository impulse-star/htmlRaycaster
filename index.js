import { WorldData } from './worldData.js';
import { SetupBackground } from './renderer.js';

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('MYCANVAS');
const context = canvas.getContext('2d');

SetupBackground(canvas, context);

// Runs Tests
import('./test.js');
