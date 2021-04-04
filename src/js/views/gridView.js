export class GridView {
    constructor() {
        this.lockSquares = null;
        this.placeObj = null;
        this.resetPos = null

        this.dragged;
        this.width = 15;
        this.height = 15;

        this.registerEvents();
    }

    renderGrid() {
        this.grid = document.getElementById('grid');
        this.grid.innerHTML = "";

        for (let y = 1; y <= this.height; y++) {
            for (let x = 1; x <= this.width; x++) {
                let element = document.createElement('div');
                element.classList.add('griditem', 'droppable');
                element.id = `{${x}-${y}}`;

                this.grid.appendChild(element);
            }
        }
    }

    registerEvents() {
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
            if (event.target.classList.contains('droppable') && !event.target.classList.contains('dragelementsholder')) {
                event.target.classList.add('current');
            }
        }, false);

        document.addEventListener("dragleave", (event) => {
            if (event.target.classList.contains('droppable') && !event.target.classList.contains('dragelementsholder')) {
                event.target.classList.remove('current');
            }
        }, false);

        document.addEventListener("drop", (event) => {
            event.preventDefault();

            // find the nearest dropzone
            let dropzone = event.target.closest('.droppable');
            
            if (dropzone == null) {
                return;
            }

            dropzone.classList.remove('current');

            // get the dragged object's id
            let objectid = this.dragged.id.split('-')[1];
            
            // check if the dropzone is in the sidepanel
            if (dropzone.classList.contains('dragelementsholder')) {
                let holdertype = dropzone.id.split('-')[0];
                let objecttype = this.dragged.id.split('-')[0];

                if (holdertype == objecttype) {
                    // reset the object to it's old position
                    this.resetPos(objectid);
                    dropzone.append(this.dragged);
                }

                return;
            }

            // check if this object is a tree
            if (this.dragged.id.includes('tree')) {
                // find a random dropzone
                let r = Math.floor(Math.abs(Math.random() * this.grid.childNodes.length));
                dropzone = this.grid.childNodes[r];
            }

            // check if the placement is valid
            if (this.placeObj(objectid, dropzone) != false) {
                // append the object to the dropzone
                dropzone?.append(this.dragged);
            }
        }, false);
    }
}