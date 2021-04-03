export class SimulationSquare {
    constructor(regionId, x, y) {
        this.regionID = regionId;
        this.x = x;
        this.y = y;
        this.maxVisitors = 7;
        this.currentVisitors = 0;
        this.visitors = [];
    }
}