import { GridView } from "../views/gridView.js";

export class GridController {
    constructor(parkObjectController) {
        this.parkObjectController = parkObjectController;
        this.regionController = parkObjectController.regioncontroller;
        this.gridView = new GridView(this);
    }

    init() {
        this.gridView.renderGrid();
    }

    place(viewObjID, dropzone) {
        let grid = document.getElementById('grid');

        //get localstorage object
        let object = this.parkObjectController.getObject(this.regionController.currentRegionID, viewObjID);

        let coords = dropzone.id.replace(/{|}/g, '').split('-');
        let dropX = Number(coords[0]);
        let dropY = Number(coords[1]);
        //check if item wont flow outside of grid.
        if ((dropX + object.width) - 1 > 15)
            return false;
        if ((dropY + object.height) - 1 > 15)
            return false;

        //check if item wont overlap other items.
        for (let x = dropX; x < dropX + object.width; x++) {
            for (let y = dropY; y < dropY + object.height; y++) {
                if (this.parkObjectController.findObjectOnPos(this.regionController.currentRegionID, x, y) != null ||
                    grid.querySelector(`div[id="{${x}-${y}}-locked"]`) != null) {
                    return false;
                }
            }
        }
        
        //save coordinates in item.
        object.x = dropX;
        object.y = dropY;

        this.lockGridSquares(object.x, object.y, object)

        this.parkObjectController.updateObject(this.regionController.currentRegionID, object)

        //return wether place was succesful or not. 
        return true;
    }

    lockGridSquares(lockX, lockY, object) {
        let grid = document.getElementById('grid');

        for (let x = lockX; x < lockX + object.width; x++) {
            for (let y = lockY; y < lockY + object.height; y++) {
                let griditem = grid.querySelector(`div[id="{${x}-${y}}"]`);

                if (griditem != null) {
                    griditem.id = `${griditem.id}-locked`;
                }
            }
        }
    }

    resetPlacement(viewObjID) {
        let object = this.parkObjectController.getObject(this.regionController.currentRegionID, viewObjID);

        object.x = null;
        object.y = null;

        this.parkObjectController.updateObject(this.regionController.currentRegionID, object);
    }
}