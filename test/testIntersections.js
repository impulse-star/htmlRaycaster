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

// TODO man i realize i made a huge mistake with these tests,
// BASICALLY they shouldn't be dependent on the block size being
// 64 units but right now they are... whoops...

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
// Test this weird case I just found
assert(() => isSolidWall(248, 96, 1, 0, testMap), false);
assert(() => isSolidWall(248, 160, 1, 0, testMap), false);
assert(() => isSolidWall(248, 224, 1, 0, testMap), true);
// LOL Looks like i need better test cases, so here they are:
const testMapEmpty =
[
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

// TESTING findWallIntersections
// Orthogonal Ray
// ray pointing right
assert(() => findWallIntersect(new RayAngle(), new Point2D(248, 96), testMap).GetX(), 256);
assert(() => findWallIntersect(new RayAngle(), new Point2D(248, 96), testMap).GetY(), 96);
// ray pointing down
assert(() => findWallIntersect(new RayAngle(270), new Point2D(248, 96), testMap).GetX(), 248);
assert(() => findWallIntersect(new RayAngle(270), new Point2D(248, 96), testMap).GetY(), 256);
// ray pointing left
// assert(() => findWallIntersect(new RayAngle(180), new Point2D(248, 96), testMap).GetX(), 64);
// assert(() => findWallIntersect(new RayAngle(180), new Point2D(248, 96), testMap).GetY(), 96);

console.log("Finished Running Tests.");