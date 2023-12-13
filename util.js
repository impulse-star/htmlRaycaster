/**
 * 
 * @param {Function} test 
 * @param {any} expectedOutput 
 */
export function assert(test, expectedOutput) {
    try {
        if (test() !== expectedOutput) alert(`Error: ${test} test failed.\n` +
            `Expected: ${expectedOutput}, actual output: ${test()}`);
    } catch (err) {
        alert(`Error: ${test} threw an exception.\n${err}`);
    }
}
// TODO: am i even using this anywhere?
export class Pixel {
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export class Point2D {
    #x;
    #y;

    constructor(x = 0, y = 0) {
        this.#x = x;
        this.#y = y;
    }
}
/**
 * Represents a RayAngle measured in degrees. The angle itself is constrained to [0, 359].
 * RCS convention is used, so 0 degrees points directly east(right).
 */
export class RayAngle {
    #rayAngle;

    constructor() {
        // Initialize to pointing right.
        this.#rayAngle = 0;
    }

    /**
     * 
     * @param {number} value A value to set the ray's angle to. Measured in degrees.
     * Trying to set this value to a number beyond 359 or lower than 0 will end up having
     * the value wrap around to the range [0, 359]
     */
    SetRayAngle(value) {
        if (value > 0) {
            this.#rayAngle = value % 360;
        } else {
            // TODO deal with the negative cases lol.
        }
    }

    /**
     * 
     * @returns The angle of the ray, measured in degrees and constrained to [0, 359]
     */
    GetRayAngle() {
        return this.#rayAngle;
    }
}

