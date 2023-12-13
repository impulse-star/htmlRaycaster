import { BLOCK_SIZE } from "./constants.js";
import { RayAngle, Point2D } from "./util.js";

/**
 * Determines if the wall that is being seen in the next block is solid or not.
 * This is done by taking in the x and y position of the camera, and the relative
 * direction of the viewing angle. (+) dirX means looking right, (-) dirX means
 * looking left. (+) dirY means looking up, (-) dirY means looking down.
 * @param {number} intX 
 * @param {number} intY 
 * @param {number} dirX 
 * @param {number} dirY 
 * @param {number[][]} map
 * @returns {Boolean} A boolean determining if what we are looking at is a solid wall.
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
 * Finds the first wall that we intersect with from a given position and angle of the camera.
 * NOTE: The function will not recognize an intersection if you are currently staring at a wall.
 * @param {RayAngle} rayAngle The angle of the ray.
 * @param {Point2D} position The point of the camera.
 * @param {number[][]} map The world map.
 * @returns {Point2D} The point of intersection between
 * a ray from the camera's position at the given angle.
 */
export function findWallIntersect(rayAngle, position, map) {
    const angle = rayAngle.GetRayAngle();
    let tileStepX = 0;
    let tileStepY = 0;
    switch (angle) {
        case (angle > 0 && angle < 90):
            tileStepX = 1;
            tileStepY = 1;
            break;
        case (angle > 90 && angle < 180):
            tileStepX = -1;
            tileStepY = 1;
            break;
        case (angle > 180 && angle < 270):
            tileStepX = -1;
            tileStepY = -1;
            break;
        case (angle > 270 && angle < 360):
            tileStepX = 1;
            tileStepY = -1;
            break;
        // The below code is for when we have an orthogonal ray.
        case (angle === 90):
            tileStepX = 0;
            tileStepY = -1;
            break;
        case (angle === 180):
            tileStepX = -1;
            tileStepY = 0;
            break;
        case (angle === 270):
            tileStepX = 0;
            tileStepY = 1;
            break;
        // RayAngle class clamps our max angle to being 359, so 360 would wrap back around to 0.
        case (angle === 0):
            tileStepX = 1;
            tileStepY = 0;
            break;
        default:
            throw new Error(`Invalid argument passed to findWallIntersect function.\nGiven angle ${angle}`);
            break;
    }
    const position = position.GetXY();
    const positionX = position[0];
    const positionY = position[1];
    // TODO deal with what happens when there is an intersection further out.
    if (isSolidWall(positionX, positionY, tileStepX, tileStepY, map)) {
        // we found an intersection.
    } else {
        // Loop through a certain number of times until you find an intersection
        // or you hit the render distance limit.
    }
}
/**
 * 
 * @param {number} cameraX The X position of the camera in floating point.
 * @param {number} cameraY The Y position of the camera in floating point.
 * @returns {{x: number, y: number}} An object containing the X and Y coordinates of the block.
 */
export function findGridPosition(cameraX, cameraY) {
    return { x: cameraX % BLOCK_SIZE, y: cameraY % BLOCK_SIZE };
}