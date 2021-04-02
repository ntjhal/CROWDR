export class SimulationCanvasView {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    init() {

    }

    renderCanvas(region) {
        let ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let po of region.parkObjects.filter(o => o.x != null && o.y != null)) {
            let image = document.createElement('img');
            image.width = 50 * po.width;
            image.height = 50 * po.height;

            image.onload = function () {
                ctx.drawImage(image, (po.x - 1) * 50, (po.y - 1) * 50), (50 * po.width) ,(50 * po.height);
            }

            if(po.imagesrc != null) {  
                image.src = po.imagesrc;
            }
        }

    }
}