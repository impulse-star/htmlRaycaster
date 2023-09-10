/**
 * 
 * @param {Function} test 
 * @param {any} expectedOutput 
 */
export function assert(test, expectedOutput) {
    try {
        if (test() !== expectedOutput) alert(`Error: ${test} test failed.\n` +
                                            `Expected: ${expectedOutput}, actual output: ${test()}`);
    } catch(err) {
        alert(`Error: ${test} threw an exception.\n${err}`);
    }
}
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

