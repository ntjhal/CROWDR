export class ParkObjectDetailView {
    constructor(controller) {
        this.regioncontroller = controller;
    }

    renderDetails(regionID, object) {
        console.log(regionID);
        console.log(object);

        let settingspanel = document.getElementById('settingspanel');
        settingspanel.innerHTML = '<h2>Object details</h2><br>' +
        `<p><strong>Type:</strong> ${object.type[0].toUpperCase() + object.type.substring(1)}</p>` +
        `<p><strong>Width:</strong> ${object.width}</p>` +
        `<p><strong>Height:</strong> ${object.height}</p>`;
   
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