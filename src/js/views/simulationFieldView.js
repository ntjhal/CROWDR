export class SimulationFieldView {
    constructor(grid) {
        this.grid = grid;
        this.getObjectsOnGrid = null;
        this.getObject = null;
    }

    renderField(region) {
        let grid = document.getElementById('sim_grid');
        grid.innerHTML = "";

        for(let y = 1; y <= 15; y++) {
            for(let x = 1; x <= 15; x++) {
                let element = document.createElement('div');
                element.id = `{${x}-${y}}-sim`;

                grid.appendChild(element);
            }
        }

        let objectsInGrid = this.getObjectsOnGrid(region.id);
        this.renderParkObjectsInGrid(objectsInGrid, region.id);
    }

    renderParkObjectsInGrid(objectsInGrid, regionID) {
        let grid = document.getElementById('sim_grid');

        for (let po of objectsInGrid) {
            let griditem = grid.querySelector(`div[id="{${po.x}-${po.y}}-sim"]`);
          
            let object = document.createElement('div');
            object.id = `${po.type}-${po.id}-sim`;
            object.style.width = `${po.width * 50}px`;
            object.style.height = `${po.height * 50}px`;

            let image = document.createElement('img');
            image.classList.add('dragimg')
            if(po.imagesrc !== undefined) {  
                image.src = po.imagesrc;
            }
            image.draggable = false;

            object.addEventListener('click', (e) => {
                this.renderParkObjectDetails(this.getObject(regionID, po.id));
            })
        
            object.appendChild(image);
            
            if (griditem != null && object != null) {
                griditem.append(object);
            }
        }
    }

    renderParkObjectDetails(object) {
        console.log(object);
        let detailspanel = document.getElementById('sim_detailspanel');
        detailspanel.innerHTML = "<h2>Details</h2><br>";

        for (let property in object) {
            if(property != "imagesrc" && property != "x" && property != "y") 
                detailspanel.innerHTML = detailspanel.innerHTML + `<p><strong>${property}:</strong> ${object[property]}</p>`
        }
    }
}