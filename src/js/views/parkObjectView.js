export class ParkObjectDetailView {
    constructor(controller) {
        this.parkObjectController = controller;
    }

    //TODO verbeteren van deze code, veel dubbele code
    renderDetails(regionID, object) {
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

        if (object.type === 'tent') {
            let field = document.createElement('div');
            field.classList.add('field');
            
            let label = document.createElement('label');
            label.textContent = 'Openingstijd'

            let input = document.createElement('input');
            input.type = 'time';
            input.value = object.openingtime;
            input.classList.add('input');
            
            input.onblur = () => {
                object.openingtime = input.value;
                this.parkObjectController.updateObject(regionID, object);
                this.renderDetails(regionID, object);
            }

            field.appendChild(label);
            field.appendChild(input);
            settingspanel.appendChild(field);
        }

        if (object.type === 'tent') {
            let field = document.createElement('div');
            field.classList.add('field');
            
            let label = document.createElement('label');
            label.textContent = 'Sluitingstijd'

            let input = document.createElement('input');
            input.type = 'time';
            input.value = object.closingtime;
            input.classList.add('input');
            
            input.onblur = () => {
                object.closingtime = input.value;
                this.parkObjectController.updateObject(regionID, object);
                this.renderDetails(regionID, object);
            }

            field.appendChild(label);
            field.appendChild(input);
            settingspanel.appendChild(field);
        }

        if (object.type === 'foodstand') {
            let field = document.createElement('div');
            field.classList.add('field');
            
            let label = document.createElement('label');
            label.textContent = 'Type eettent'

            let input = document.createElement('input');
            input.type = 'text';
            input.value = object.foodtype;
            input.classList.add('input');
            
            input.onblur = () => {
                object.foodtype = input.value;
                this.parkObjectController.updateObject(regionID, object);
                this.renderDetails(regionID, object);
            }

            field.appendChild(label);
            field.appendChild(input);
            settingspanel.appendChild(field);
        }
        
        if (object.type === 'trashcan') {
            let field = document.createElement('div');
            field.classList.add('field');
            
            let label = document.createElement('label');
            label.textContent = "Capaciteit in kilo's"

            let input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.value = object.capacity;
            input.classList.add('input');
            
            input.onblur = () => {
                object.capacity = input.value;
                this.parkObjectController.updateObject(regionID, object);
                this.renderDetails(regionID, object);
            }

            field.appendChild(label);
            field.appendChild(input);
            settingspanel.appendChild(field);
        }

        if (object.type === 'trashcan') {
            let field = document.createElement('div');
            field.classList.add('field');
            
            let label = document.createElement('label');
            label.textContent = "Tijd tot leegmaken (seconden)";

            let input = document.createElement('input');
            input.type = 'number';
            input.min = 0;
            input.value = object.timeBetweenEmpty;
            input.classList.add('input');
            
            input.onblur = () => {
                object.timeBetweenEmpty = input.value;
                this.parkObjectController.updateObject(regionID, object);
                this.renderDetails(regionID, object);
            }

            field.appendChild(label);
            field.appendChild(input);
            settingspanel.appendChild(field);
        }
    }    
}
