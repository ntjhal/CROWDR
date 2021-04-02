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

        function compare(a, b) {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        }

        updatedObjects.sort(compare)

        region.parkObjects = updatedObjects;

        this.regioncontroller.saveRegion(region);
    }

    getObject(regionID, objectID) {
        let region = this.regioncontroller.getRegion(regionID);

        let index = region.parkObjects.findIndex(o => o.id == objectID);
        let object = region.parkObjects[index];

        return object;
    }

    findObjectOnPos(regionID, x, y) {
        let region = this.regioncontroller.getRegion(regionID);
        let index = region.parkObjects.findIndex(o => o.x == x && o.y == y);
        let object = region.parkObjects[index];

        return object;
    }

    getObjectsOnGrid(regionID) {
        let region = this.regioncontroller.getRegion(regionID);

        return region.parkObjects.filter(o => o.x != null && o.y != null);
    }
}