export class GridView {

    constructor() {
        this.dragged;
    }
     

    renderGrid() {
        let grid = document.getElementById('grid');

        for(let x = 1; x <= 15; x++) {
            for(let y = 1; y <= 15; y++) {
                let element = document.createElement('div');
                element.classList.add('griditem', 'droppable');
                element.id = `{${x}-${y}}`;

                grid.appendChild(element);
            }
        }

        document.addEventListener("drag", (event) => {

        }, false);

        document.addEventListener("dragstart", (event) => {
            this.dragged = event.target;
            this.dragged.style.opacity = .5;
        }, false);

        document.addEventListener("dragend", (event) => {
            event.target.style.opacity = "";
        }, false);

        document.addEventListener("dragover", (event) => {
            event.preventDefault();
        }, false);

        document.addEventListener("dragenter", (event) => {
            if(event.target.classList.contains('droppable') && !event.target.classList.contains('dragelementsholder')) {
                event.target.classList.add('current');
            }
        }, false);

        document.addEventListener("dragleave", (event) => {
            if( event.target.classList.contains('droppable') && !event.target.classList.contains('dragelementsholder')) {
                event.target.classList.remove('current');
            }
        }, false);

        document.addEventListener("drop", (event) => {
            event.preventDefault();

            let dropzone = event.target.closest('.droppable');
    
            if (dropzone != null) {
                dropzone.classList.remove('current');
                
                if (dropzone.classList.contains('dragelementsholder')) {
                    let holdertype = dropzone.id.split('-')[0];
                    let objecttype = this.dragged.id.split('-')[0];
                    
                    if (holdertype == objecttype) {
                        dropzone.append(this.dragged);
                    }
                } else {
                    dropzone.append(this.dragged);
                }
            }
        }, false);
    }

}