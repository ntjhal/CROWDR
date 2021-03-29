export class ParkObjectController {
    constructor(controller) {
        this.regioncontroller = controller;
    }
    
    updateObject(regionID, object) {
        let region = this.regioncontroller.getRegion(regionID);

        let updatedObjects = [];
        updatedObjects = region.parkObjects;
        let index =  updatedObjects.findIndex(o => o.id === object.id);
        updatedObjects.splice(index, 1)
        updatedObjects.push(object);

        region.parkObjects = updatedObjects;

        this.regioncontroller.saveRegion(region);
    }
}