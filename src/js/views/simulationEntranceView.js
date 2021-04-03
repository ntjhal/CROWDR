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
        input.value = 10;
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

        // TODO startsimulation'
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

        this.clearQueue(index, queueSpace) 

        for (let i = 0; i < queue.length; i++) {
            
            for (let j = 0; j < queue[i].groupsize; j++) {
                ctx.beginPath();
                ctx.fillStyle = "pink";
                ctx.arc(75 + i * (queueSpace / 7), (40 - (j * 10)) + (75 * (index-1)), circleR, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    renderEnterGroup(group, index) {
        let ctx = this.canvas.getContext('2d');
        let circleR = 5

        for (let j = 0; j < group.groupsize; j++) {
            ctx.beginPath();
            ctx.fillStyle = "pink";
            ctx.arc(20, (40 - (j * 10)) + (75 * (index-1)), circleR, 0, 2 * Math.PI);
            ctx.fill();
        }

        setTimeout(this.clearEnterGroup, 800, index, this.canvas);
    }

    clearQueue(index, clearWidth) {
        let ctx = this.canvas.getContext('2d');

        ctx.clearRect(60, 5 + (75 * (index-1)), clearWidth, 50)
    } 

    clearEnterGroup(index, canvas) {
        let ctx = canvas.getContext('2d');

        ctx.clearRect(15, 5 + (75 * (index-1)), 15, 50 )
    }


}