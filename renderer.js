import { RECT_WIDTH, BLOCK_SIZE } from "./constants.js";

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 */
export function drawPixel(ctx, x, y) {
    ctx.fillStyle = '#FF00FF';
    ctx.fillRect(x, y, 1, 1);
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
 * 
 * @param {number} intX 
 * @param {number} intY 
 * @param {number} dirX 
 * @param {number} dirY 
 * @param {number[][]} map
 * @returns {Boolean}
 */
export function isSolidWall(intX, intY, dirX, dirY, map) {
    const blockX = Math.trunc(Math.trunc(intX / BLOCK_SIZE) + dirX / 2);
    const blockY = Math.trunc(Math.trunc(intY / BLOCK_SIZE) + dirY / 2);
    // We can fix thiss later but im guessing that if we are out of bounds we dont have any solid walls.
    if (blockX >= map.length || blockX < 0) return false;
    if (blockY >= map[0]?.length || blockY < 0) return false;

    const wallType = map[blockX][blockY];
    return wallType === 1 ? true : false;
}
/**
 * 
 * @param {number} rayAngle 
 * @returns {Pixel}
 */
export function findWallIntersect(rayAngle, position) {
    let tileStepX = 0;
    let tileStepY = 0;
    if (rayAngle > 0 && rayAngle < 90) {
        tileStepX = 1;
        tileStepY = 1;
    } else if (rayAngle > 90 && rayAngle < 180) {
        tileStepX = -1;
        tileStepY = 1;
    } else if (rayAngle > 180 && rayAngle < 270) {
        tileStepX = -1;
        tileStepY = -1;
    } else if (rayAngle > 270 && rayAngle < 360) {
        tileStepX = 1;
        tileStepY = -1;
    } else {
        // TODO: orthogonal ray, special case.
    }

}