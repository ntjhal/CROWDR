export class ParkObjectDetailView {
    constructor(controller) {
        this.parkObjectController = controller;
    }

    renderDetails(regionID, object) {
        console.log(regionID);
        console.log(object);

        let settingspanel = document.getElementById('settingspanel');
        settingspanel.innerHTML = '<h2>Object details</h2><br>' +
        `<p><strong>ID:</strong> ${object.id} </p>` +
        `<p><strong>Type:</strong> ${object.type[0].toUpperCase() + object.type.substring(1)}</p>` +
        `<p><strong>Width:</strong> ${object.width}</p>` +
        `<p><strong>Height:</strong> ${object.height}</p>`;
        
        if (object.type === 'tent' || object.type === 'foodstand') {
            let field = document.createElement('div');
            field.classList.add('field');
            
            let label = document.createElement('label');
            label.textContent = 'Maximaal aantal bezoekers'

            let input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.value = object.maxVisitors;
            input.classList.add('input');
            input.onchange = () => {
                object.maxVisitors = input.value;
                this.parkObjectController.updateObject(regionID, object);
                this.renderDetails(regionID, object);
            }

            field.appendChild(label);
            field.appendChild(input);
            settingspanel.appendChild(field);
        }
            
    }

    
}