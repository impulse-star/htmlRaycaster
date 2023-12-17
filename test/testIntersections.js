import { Point2D, RayAngle, assert } from '../util.js';
import { findWallIntersect, isSolidWall } from '../intersections.js';

console.log("Running tests...");

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('MYCANVAS');
const context = canvas.getContext('2d');

// dirY being positive means going down
const testMap =
[
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
];

// TESTING isSolidWall
// Empty and Empty Corner
assert(() => isSolidWall(128, 128, 1, -1, testMap), false);
assert(() => isSolidWall(128, 128, 1, 1, testMap), false);
// empty and empty corner really deep in.
assert(() => isSolidWall(192, 192, 1, 1, testMap), false);
assert(() => isSolidWall(192, 192, 1, -1, testMap), false);
assert(() => isSolidWall(192, 192, -1, 1, testMap), false);
assert(() => isSolidWall(192, 192, -1, -1, testMap), false);
// Top left corner.
assert(() => isSolidWall(64, 64, 1, 1, testMap), false);
assert(() => isSolidWall(64, 64, 1, -1, testMap), true);
assert(() => isSolidWall(64, 64, -1, 1, testMap), true);
assert(() => isSolidWall(64, 64, -1, -1, testMap), true);
// Top left solid and solid (intersecting right).
assert(() => isSolidWall(64, 48, 1, 1, testMap), true);
assert(() => isSolidWall(64, 48, 1, -1, testMap), true);
assert(() => isSolidWall(64, 48, -1, 1, testMap), true);
assert(() => isSolidWall(64, 48, -1, -1, testMap), true);
// Top left solid and solid (intersecting bottom).
assert(() => isSolidWall(48, 64, 1, 1, testMap), true);
assert(() => isSolidWall(48, 64, 1, -1, testMap), true);
assert(() => isSolidWall(48, 64, -1, 1, testMap), true);
assert(() => isSolidWall(48, 64, -1, -1, testMap), true);
// From empty to solid block top
assert(() => isSolidWall(96, 64, 1, -1, testMap), true);
assert(() => isSolidWall(128, 64, 1, -1, testMap), true);
assert(() => isSolidWall(96, 64, -1, -1, testMap), true);
assert(() => isSolidWall(128, 64, -1, -1, testMap), true);
// From empty to solid block left
assert(() => isSolidWall(64, 96, -1, -1, testMap), true);
assert(() => isSolidWall(64, 128, -1, -1, testMap), true);
assert(() => isSolidWall(64, 96, -1, 1, testMap), true);
assert(() => isSolidWall(64, 128, -1, 1, testMap), true);
// From empty to solid block right
assert(() => isSolidWall(256, 96, 1, -1, testMap), true);
assert(() => isSolidWall(256, 128, 1, -1, testMap), true);
assert(() => isSolidWall(256, 96, 1, 1, testMap), true);
assert(() => isSolidWall(256, 128, 1, 1, testMap), true);
// From empty to solid block bottom
assert(() => isSolidWall(96, 256, 1, 1, testMap), true);
assert(() => isSolidWall(128, 256, 1, 1, testMap), true);
assert(() => isSolidWall(96, 256, -1, 1, testMap), true);
assert(() => isSolidWall(128, 256, -1, 1, testMap), true);
// shouldnt happen but this is if no intersections mid wall.
assert(() => isSolidWall(48, 48, 1, 1, testMap), true);
assert(() => isSolidWall(48, 48, -1, 1, testMap), true);
assert(() => isSolidWall(48, 48, 1, -1, testMap), true);
assert(() => isSolidWall(48, 48, -1, -1, testMap), true);
// Test without being right on a corner of a block
assert(() => isSolidWall(96, 96, 1, 1, testMap), false);
assert(() => isSolidWall(96, 96, -1, 1, testMap), true);
assert(() => isSolidWall(96, 96, 1, -1, testMap), true);
assert(() => isSolidWall(96, 96, -1, -1, testMap), true);

// TESTING findWallIntersections
// Orthogonal Ray
assert(() => findWallIntersect(new RayAngle(), new Point2D(248, 96), testMap).GetY(), 96);

console.log("Finished Running Tests.");