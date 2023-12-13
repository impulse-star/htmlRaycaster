import { RECT_WIDTH, BLOCK_SIZE } from "./constants.js";
import { Pixel } from "./util.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Pixel} pixel 
 */
export function drawPixel(ctx, pixel) {
    ctx.fillStyle = '#FF00FF';
    ctx.fillRect(pixel.x, pixel.y, 1, 1);
}
/**
 * 
 * @param {number} height 
 * @param {number} distanceFromScreen 
 */
export function drawColumn(canvas, context, height, distanceFromScreen) {
    const xPosOfRect = distanceFromScreen * RECT_WIDTH;
    const halfOfRectHeight = Math.floor(height / 2);
    const halfOfScreenHeight = Math.floor(canvas.height / 2);
    const yPosOfRect = halfOfScreenHeight - halfOfRectHeight;
    context.fillStyle = '#00008F';
    context.fillRect(xPosOfRect, yPosOfRect, RECT_WIDTH, height);
}
/**
 * Sets up the ceiling and floor so that they draw to the horizon.
 * @param {HTMLCanvasElement} canvas An html Canvas.
 * @param {CanvasRenderingContext2D} context The context for the aformentioned canvas.
 */
export function SetupBackground(canvas, context) {
    // setup ceiling and floor
    const canvasHeight = canvas.height;
    const canvasWidth = canvas.width;
    context.fillStyle = '#BFBFBF';
    context.fillRect(0, 0, canvasWidth, canvasHeight / 2);
    context.fillStyle = '#8F8F8F';
    context.fillRect(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);
}