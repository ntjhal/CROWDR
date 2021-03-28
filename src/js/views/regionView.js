export class RegionView {
    constructor(div) {
        this.div = div;
    }

    render(region) {
        let btn = document.createElement('button');
        btn.innerHTML = region.name;
        btn.classList.add("regionbtn");

        btn.addEventListener('click', (e) => {
            //TODO whatever calls are triggered by this button 
            this.renderParkObjects(region)
        });

        this.div.appendChild(btn);
    }

    renderParkObjects(region) {
        let dragelements = document.getElementById('dragelements');
        dragelements.innerHTML = region.name;

        const typeArray = region.parkObjects.map(x => x.type);
        let uniqueTypes = typeArray.filter((item, i, ar) => ar.indexOf(item) === i);

        
        for (let type of uniqueTypes) {
            let typeDiv = document.createElement('div');
            typeDiv.classList.add('dragelementsholder');
            typeDiv.innerHTML = type;

            for (let po of region.parkObjects.filter(x => x.type === type)) {
                let object = document.createElement('div');
                object.id = `parkobject-${po.id}`;
                object.classList.add('dragelement');

                typeDiv.appendChild(object);
            }

            dragelements.appendChild(typeDiv);
        }
    }
}