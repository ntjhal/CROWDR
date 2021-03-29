export class ParkObjectController {
    constructor(controller) {
        this.regioncontroller = controller;
    }
    
    updateObject(regionID, object) {
        let region = this.regioncontroller.getRegion(regionID);

        let updatedObjects = region.parkObjects;
        updatedObjects.filter(o => o.id !== object.id);
        updatedObjects.push(object);

        region.parkObjects = updatedObjects;

        this.regioncontroller.saveRegion(region);
    }
}