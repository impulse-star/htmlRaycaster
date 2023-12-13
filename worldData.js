/**
 * A class that represents the data of the world at any given time.
 * Data about the cameras position and the map should go here.
 * Maybe a better name for this would be something like "GameState"
 */
export class WorldData {
    constructor() {
        this.map =
            [
                [1, 1, 1, 1, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 0, 0, 0, 1],
                [1, 1, 1, 1, 1],
            ];
        this.cameraXPos = 0.0;
        this.cameraYPos = 0.0;
        this.cameraViewAngle = 0.0;
    }
}