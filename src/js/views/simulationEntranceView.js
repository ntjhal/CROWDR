export class SimulationEntranceView {
    constructor() {
        this.canvas = document.querySelector('#entranceCanvas');
        this.canvas.width = 300;

        this.amountOfLines = 3;

        this.renderEntrance();
    }

    init() {
        
    }

    renderEntrance() {
        let lineWidth = 75;
        let boxWidht = 25;
        this.canvas.height = this.amountOfLines * lineWidth;

        let ctx = this.canvas.getContext('2d');
        
        for (let y = 1; y <= this.amountOfLines; y++) {
            ctx.beginPath();
            ctx.moveTo(0, y * lineWidth);
            ctx.lineTo(this.canvas.width, y * lineWidth);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillRect(30, (lineWidth * y) - boxWidht, lineWidth / 3, lineWidth / 3)
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.strokeStyle = "red";
        ctx.moveTo(55, 0);
        ctx.lineTo(55, this.canvas.height);
        ctx.stroke();
    }


}