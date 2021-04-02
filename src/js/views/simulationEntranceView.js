export class SimulationEntranceView {
    constructor() {
        this.startSimulation = null;
        this.init();
    }

    init() {
        let entranceholder = document.querySelector('#entrance')

        this.canvas = document.querySelector('#entranceCanvas');
        this.canvas.width = 300;

        let input = document.createElement('input');
        input.type = 'number';
        input.min = 0;
        input.value = 3;
        input.id = 'linesInput'
        input.classList.add('input');

        let btn = document.createElement('button');
        btn.textContent = 'Start Simulation';
        btn.addEventListener('click', (e) => {
            this.onStart();
        })

        let beforeNode = entranceholder.querySelector('div');
        entranceholder.insertBefore(input, beforeNode);
        entranceholder.insertBefore(btn, beforeNode);
    }

    onStart() {
        this.amountOfLines = document.querySelector('#linesInput').value;
        this.renderEntrance();

        //TODO startsimulation'
        this.startSimulation(this.amountOfLines);
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

    renderQueue(queue, index) {
        let ctx = this.canvas.getContext('2d');
        let queueSpace = this.canvas.width - 75;
        let circleR = 5

        for (let i = 0; i < queue.length; i++) {
            
            for (let j = 0; j < queue[i].groupsize; j++) {
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.arc(75 + i * (queueSpace / 7), (40 - (j * 10)) + (75 * index), circleR, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }


}