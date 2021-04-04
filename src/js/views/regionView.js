import { ParkObjectDetailView } from "./parkObjectView.js";

export class RegionView {
    constructor(div) {
        this.div = div;
        this.gridRender = null;
        this.lockGridItems = null;
        this.onLock = null;
    }

    setParkObjectController(poc) {
        this.parkObjectController = poc;
        this.parkObjectView = new ParkObjectDetailView(poc);
    }

    render(region) {
        // create a button
        let btn = document.createElement('button');
        btn.innerHTML = region.name;
        btn.classList.add("regionbtn");

        // listen for clicks
        btn.addEventListener('click', (e) => {
            document.getElementById('settingspanel').innerHTML = "<h2>Object details</h2>";

            this.parkObjectController.regioncontroller.currentRegionID = region.id;
            this.renderParkObjects(region)
            this.gridRender();
            this.renderParkObjectsInGrid(this.parkObjectController.getObjectsOnGrid(region.id))
            this.lockGridItems();
            this.renderLockButton();

            // check if the region is locked
            if (region.locked) {
                this.toggleLock();
            }
        });

        this.div.appendChild(btn);
    }

    renderLockButton() {
        let lock = document.createElement('button');
        lock.textContent = 'Lock';
        lock.id = 'lock';
        lock.addEventListener('click', (e) => {
            this.toggleLock();
        });

        let infoDiv = document.querySelector('#regioninfo');
        let lockbtn = infoDiv.querySelector('#lock');

        if (lockbtn != null) {
            infoDiv.removeChild(lockbtn);
        }

        infoDiv.appendChild(lock);
    }

    toggleLock() {
        this.lock();
        lock.disabled = !this.lock.disabled;
        lock.classList.toggle('disabled');
    }

    lock() {
        this.onLock();

        // get all items on the grid and elements on the stack
        let items = document.querySelectorAll('#grid .griditem');
        let elements = document.querySelector('#dragelements');

        items.forEach(item => {
            // loop through all items on the grid
            item.childNodes.forEach(child => {
                // set draggable to false
                child.draggable = false;
            });
        });

        elements.childNodes.forEach(child => {
            child.childNodes.forEach(elem => {
                elem.disabled = true;
                elem.draggable = false;
                elem.classList.add('disabled');
            })
        });
    }

    renderParkObjects(region) {
        // clear the stack
        let dragelements = document.getElementById('dragelements');
        dragelements.innerHTML = "";

        // get all different object types
        const typeArray = region.parkObjects.map(x => x.type);
        let uniqueTypes = typeArray.filter((item, i, ar) => ar.indexOf(item) === i);

        // loop through all different object types
        for (let type of uniqueTypes) {
            // create a holder
            let typeDiv = document.createElement('div');
            typeDiv.id = `${type}-holder`;
            typeDiv.classList.add('dragelementsholder');

            // loop through all objects of the current type
            for (let po of region.parkObjects.filter(x => x.type === type)) {
                // create an object
                let object = document.createElement('div');
                object.id = `${po.type}-${po.id}`;
                object.classList.add('dragelement');
                object.style.width = `${po.width * 50}px`;
                object.style.height = `${po.height * 50}px`;
                object.draggable = true;

                // add an image
                let image = document.createElement('img');
                image.classList.add('dragimg')
                image.draggable = false;

                if (po.imagesrc !== undefined) {  
                    image.src = po.imagesrc;
                    typeDiv.style.backgroundImage = `url('${po.imagesrc}')`;
                    typeDiv.style.backgroundSize = `${po.width * 50}px ${po.height * 50}px`
                    typeDiv.classList.add('typeDiv');
                }

                // listen for clicks on the object
                object.addEventListener('click', (e) => {
                    this.parkObjectView.renderDetails(region.id, po);
                })
            
                // add the object to the holder
                object.appendChild(image);
                typeDiv.appendChild(object);
                typeDiv.classList.add('droppable')
            }

            // add the holders to the stack
            dragelements.appendChild(typeDiv);
        }
    }

    renderParkObjectsInGrid(objectsInGrid) {
        let grid = document.getElementById('grid');

        // loop through all objects on the grid
        for (let obj of objectsInGrid) {
            let griditem = grid.querySelector(`div[id="{${obj.x}-${obj.y}}"]`);
            let dragitem = document.getElementById(`${obj.type}-${obj.id}`);

            if (griditem != null && dragitem != null) {
                griditem.append(dragitem);
            }
        }
    }
}
