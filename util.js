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

    SetX(xValue) {
        if ((typeof xValue) !== 'number') {
            throw new Error("Invalid argument provided to SetX");
        }
        this.#x = xValue;
    }

    SetY(yValue) {
        if ((typeof yValue) !== 'number') {
            throw new Error("Invalid argument provided to SetX");
        }
        this.#y = yValue;
    }

    /**
     * 
     * @returns {[number, number]} A 2-element array containing the x and y
     * values of the object, in that order.
     */
    GetXY() {
        return [x, y]
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

