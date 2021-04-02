export class GridView {

    constructor(controller, regionView) {
        this.gridController = controller;
        this.regionView = regionView;
        this.regionView.gridRender = this.renderGrid.bind(this);
        this.regionView.lockGridItems = this.lockGrid.bind(this)

        this.dragged;
        this.width = 15;
        this.height = 15;
    }
    
    lockGrid() {
        this.gridController.lockGridSquaresFullGrid();
    }

    renderGrid() {
        let grid = document.getElementById('grid');
        grid.innerHTML = "";

        for(let y = 1; y <= 15; y++) {
            for(let x = 1; x <= 15; x++) {
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

                let objectid = this.dragged.id.split('-')[1];
                
                if (dropzone.classList.contains('dragelementsholder')) {
                    let holdertype = dropzone.id.split('-')[0];
                    let objecttype = this.dragged.id.split('-')[0];

                    if (holdertype == objecttype) {
                        this.gridController.resetPlacement(objectid);
                        dropzone.append(this.dragged);
                    }
                } else if (this.gridController.place(objectid, dropzone) == true) {
                    dropzone.append(this.dragged);
                }
            }
        }, false);
    }
}