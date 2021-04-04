import { ParkObjectDetailView } from "./parkObjectView.js";

export class RegionView {
    constructor(div) {
        this.div = div;
        this.gridRender = null;
        this.lockGridItems = null;

        this.init();
    }

    init() {
        // render a 'lock' button
        let lock = document.createElement('button');
        lock.textContent = 'Lock';
        lock.addEventListener('click', (e) => {
            this.lock();
            lock.disabled = true;
            lock.classList.add('disabled');
        });

        let infoDiv = document.querySelector('#regioninfo');
        infoDiv.appendChild(lock);
    }

    setParkObjectController(poc) {
        this.parkObjectController = poc;
        this.parkObjectView = new ParkObjectDetailView(poc);
    }

    render(region) {
        let btn = document.createElement('button');
        btn.innerHTML = region.name;
        btn.classList.add("regionbtn");

        btn.addEventListener('click', (e) => {
            // TODO whatever calls are triggered by this button 
            document.getElementById('settingspanel').innerHTML = "<h2>Object details</h2>";

            this.parkObjectController.regioncontroller.currentRegionID = region.id;
            this.renderParkObjects(region)
            this.gridRender();
            this.renderParkObjectsInGrid(this.parkObjectController.getObjectsOnGrid(region.id))
            this.lockGridItems();
        });

        this.div.appendChild(btn);
    }

    lock() {
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
        let dragelements = document.getElementById('dragelements');
        dragelements.innerHTML = "";

        const typeArray = region.parkObjects.map(x => x.type);
        let uniqueTypes = typeArray.filter((item, i, ar) => ar.indexOf(item) === i);

        for (let type of uniqueTypes) {
            let typeDiv = document.createElement('div');
            typeDiv.id = `${type}-holder`;
            typeDiv.classList.add('dragelementsholder');
            // typeDiv.innerHTML = type;

            for (let po of region.parkObjects.filter(x => x.type === type)) {
                let object = document.createElement('div');
                object.id = `${po.type}-${po.id}`;
                object.classList.add('dragelement');
                object.style.width = `${po.width * 50}px`;
                object.style.height = `${po.height * 50}px`;
                object.draggable = true;

                let image = document.createElement('img');
                image.classList.add('dragimg')
                if (po.imagesrc !== undefined) {  
                    image.src = po.imagesrc;
                    typeDiv.style.backgroundImage = `url('${po.imagesrc}')`;
                    typeDiv.style.backgroundSize = `${po.width * 50}px ${po.height * 50}px`
                    typeDiv.classList.add('typeDiv');
                }
                
                image.draggable = false;

                object.addEventListener('click', (e) => {
                    this.parkObjectView.renderDetails(region.id, po);
                })
            
                object.appendChild(image);
                typeDiv.appendChild(object);
                typeDiv.classList.add('droppable')
            }

            dragelements.appendChild(typeDiv);
        }
    }

    renderParkObjectsInGrid(objectsInGrid) {
        let grid = document.getElementById('grid');

        for (let obj of objectsInGrid) {
            let griditem = grid.querySelector(`div[id="{${obj.x}-${obj.y}}"]`);
            let dragitem = document.getElementById(`${obj.type}-${obj.id}`);

            if (griditem != null && dragitem != null) {
                griditem.append(dragitem);
            }
        }
    }
}