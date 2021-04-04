export class GridController {
    constructor(parkObjectController, regionView, gridView) {
        this.parkObjectController = parkObjectController;
        this.regionController = parkObjectController.regioncontroller;
        
        this.gridView = gridView;
        this.gridView.placeObj = this.place.bind(this);
        this.gridView.resetPos = this.resetPlacement.bind(this);

        this.regionView = regionView;
        this.regionView.gridRender = this.render.bind(this);
        this.regionView.lockGridItems = this.lockGridSquaresFullGrid.bind(this)
    }

    render() {
        this.gridView.renderGrid();
    }

    place(viewObjID, dropzone) {
        // get localstorage object
        let object = this.parkObjectController.getObject(this.regionController.currentRegionID, viewObjID);

        let coords = dropzone.id.replace(/{|}/g, '').split('-');
        let dropX = Number(coords[0]);
        let dropY = Number(coords[1]);
        
        if (!this.checkPlacement(dropX, dropY, object)) {
            return false;
        }

        // save coordinates in item.
        if (object.type.includes('tree')) {
            let pos = this.getRandomPos(object);
            object.x = pos.x;
            object.y = pos.y;
        } else {
            object.x = dropX;
            object.y = dropY;
        }

        // this.lockGridSquares(object.x, object.y, object)
        this.parkObjectController.updateObject(this.regionController.currentRegionID, object);

        this.lockGridSquaresFullGrid(this.parkObjectController.getObjectsOnGrid(this.regionController.currentRegionID));

        // return whether place was succesful or not. 
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

    lockGridSquaresFullGrid() {
        let gridObjects = this.parkObjectController.getObjectsOnGrid(this.regionController.currentRegionID);
        let griditems = document.querySelectorAll('#grid > div[id$=locked]');

        for (let griditem of griditems) {
            let str = griditem.id;
            str = str.replace(/-locked/g, '');

            griditem.id = str;
        }

        for (let object of gridObjects) {
            this.lockGridSquares(object.x, object.y, object);
        }
    }

    resetPlacement(viewObjID) {
        let object = this.parkObjectController.getObject(this.regionController.currentRegionID, viewObjID);

        object.x = null;
        object.y = null;

        this.parkObjectController.updateObject(this.regionController.currentRegionID, object);
    }

    getRandomPos(object) {    
        let x, y = 0;

        do {
            x = Math.floor(Math.abs(Math.random() * 15));
            y = Math.floor(Math.abs(Math.random() * 15));
        } while (!this.checkPlacement(x, y, object));

        return {
            x: x,
            y: y
        };
    }

    checkPlacement(x, y, object) {
        // check if item wont flow outside of grid.
        if ((x + object.width) - 1 > 15)
            return false;

        if ((y + object.height) - 1 > 15)
            return false;

        // check if item wont overlap other items.
        for (let xPos = x; xPos < x + object.width; xPos++) {
            for (let yPos = y; yPos < y + object.height; yPos++) {
                if (this.parkObjectController.findObjectOnPos(this.regionController.currentRegionID, xPos, yPos) != null || grid.querySelector(`div[id="{${xPos}-${yPos}}-locked"]`) != null) {
                    return false;
                }
            }
        }

        return true;
    }
}