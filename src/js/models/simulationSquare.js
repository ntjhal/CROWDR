export class SimulationSquare {
    constructor(regionId, x, y) {
        this.regionID = regionId;
        this.x = x;
        this.y = y;
        this.amountOfVisitors = 0;
        this.maxVisitors = 7;
        this.visitors = [];
    }
}