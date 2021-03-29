import { ParkObjectDetailView } from "./parkObjectView.js";

export class RegionView {
    constructor(div) {
        this.div = div;
    }

    setParkObjectController(poc) {
        this.parkObjectView = new ParkObjectDetailView(poc)
    }

    render(region) {
        let btn = document.createElement('button');
        btn.innerHTML = region.name;
        btn.classList.add("regionbtn");

        btn.addEventListener('click', (e) => {
            //TODO whatever calls are triggered by this button 
            document.getElementById('settingspanel').innerHTML = "";

            this.renderParkObjects(region)
        });

        this.div.appendChild(btn);
    }

    renderParkObjects(region) {
        let dragelements = document.getElementById('dragelements');
        dragelements.innerHTML = "";

        const typeArray = region.parkObjects.map(x => x.type);
        let uniqueTypes = typeArray.filter((item, i, ar) => ar.indexOf(item) === i);

        
        for (let type of uniqueTypes) {
            let typeDiv = document.createElement('div');
            typeDiv.classList.add('dragelementsholder');
            //typeDiv.innerHTML = type;

            for (let po of region.parkObjects.filter(x => x.type === type)) {
                let object = document.createElement('div');
                object.id = `parkobject-${po.id}`;
                object.classList.add('dragelement');
                object.style.width = `${po.width * 50}px`;
                object.style.height = `${po.height * 50}px`;

                let image = document.createElement('img');
                image.classList.add('dragimg')
                if(po.imagesrc !== undefined) 
                    image.src = po.imagesrc;
                
                object.addEventListener('click', (e) => {
                    this.parkObjectView.renderDetails(region.id, po);
                })
            
                object.appendChild(image);
                typeDiv.appendChild(object);
            }

            dragelements.appendChild(typeDiv);
        }
    }
}