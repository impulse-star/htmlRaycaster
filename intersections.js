import { BLOCK_SIZE, MAX_BLOCK_TRAVERSAL_ITERATIONS } from "./constants.js";
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
 * 
 * NOTE: The function will not recognize an intersection with a wall that the camera currently
 * occupies. If the camera is standing in a block where a wall is, the first intersection found
 * will be one that is beyond the currently stood in wall. This should only concern you if you
 * are out of bounds, which shouldn't happen normally.
 * @param {RayAngle} rayAngle The angle of the ray.
 * @param {Point2D} position The point of the camera.
 * @param {number[][]} map The world map.
 * @returns {Point2D | null} The point of intersection between
 * a ray from the camera's position at the given angle.
 */
export function findWallIntersect(rayAngle, position, map) {
    const angle = rayAngle.GetRayAngle();
    let tileStepX = 0;
    let tileStepY = 0;
    if (angle > 0 && angle < 90) {
        tileStepX = 1;
        tileStepY = 1;
    } else if (angle > 90 && angle < 180) {
        tileStepX = -1;
        tileStepY = 1;
    } else if (angle > 180 && angle < 270) {
        tileStepX = -1;
        tileStepY = -1;
    } else if (angle > 270 && angle < 360) {
        tileStepX = 1;
        tileStepY = -1;
    } else if (angle === 90) {
        tileStepX = 0;
        tileStepY = -1;
    } else if (angle === 180) {
        tileStepX = -1;
        tileStepY = 0;
    } else if (angle === 270) {
        tileStepX = 0;
        tileStepY = 1;
    // There's no 360, since RayAngle wraps that back around to 0.
    } else if (angle === 0) {
        tileStepX = 1;
        tileStepY = 0;
    } else {
        throw new Error(`Invalid argument passed to findWallIntersect function.\nGiven angle ${angle}`);
    }

    const positionXY = position.GetXY();
    let positionX = positionXY[0];
    let positionY = positionXY[1];

    let iterations = 0;
    let solidWallFound = isSolidWall(positionX, positionY, tileStepX, tileStepY, map);
    while (iterations < MAX_BLOCK_TRAVERSAL_ITERATIONS && !solidWallFound) {
        // Maybe you could one line this, or make it cleaner. To my eyes,
        // this is clean enough.
        if (tileStepX) {
            positionX = positionX + (BLOCK_SIZE * tileStepX);
        }
        if (tileStepY) {
            positionY = positionY + (BLOCK_SIZE * tileStepY);
        }

        solidWallFound = isSolidWall(positionX, positionY, tileStepX, tileStepY, map);
        iterations++;
    }
    if (solidWallFound) {
        const pointWhereSolidWallWasFound = new Point2D(positionX, positionY);
        const exactPositionOfSolidWall = findSideOfBlockCoordinates(pointWhereSolidWallWasFound, DIRECTION.UP);
        return new Point2D(positionX, positionY);
    } else {
        return null;
    }
}
/**
 * 
 * @param {number} cameraX The X position of the camera in floating point.
 * @param {number} cameraY The Y position of the camera in floating point.
 * @returns {{x: number, y: number}} An object containing the X and Y 
 * coordinates of the camera in the block.
 */
export function findGridPosition(cameraX, cameraY) {
    return { x: cameraX % BLOCK_SIZE, y: cameraY % BLOCK_SIZE };
}

class DIRECTION {
    static UP = 'Up';
    static DOWN = 'Down';
    static LEFT = 'Left';
    static RIGHT = 'Right';
}

/**
 * 
 * @param {Point2D} point The point which exists in a block.
 * @param {'Up' | 'Down' | 'Left' | 'Right'} direction 
 * @returns {Point2D} A point that is along the "direction" side
 * of the block that is located at point's location.
 */
export function findSideOfBlockCoordinates(point, direction) {
    // pass
}