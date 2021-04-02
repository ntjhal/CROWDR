export class SimulationController {
    constructor(entrance, field, visitorController) {
        this.visitorController = visitorController;
        this.fieldView = field;
        this.entranceView = entrance;
        this.entranceView.startSimulation = this.startSimulation.bind(this);

        this.queueIntervals = []; 
    }

    startSimulation(amountOfLines) {
        this.initQueue(amountOfLines);

        let queues = [];
        if(localStorage.queues !== undefined) {
            queues = JSON.parse(localStorage.queues)
        }

        //interval add to queue
        if (this.queueIntervals != null)
            this.stopIntervals();
        for (let i = 0; i < queues.length; i++) {
            var interval = setInterval(this.addToQueue, 1000, i, this.visitorController, this.entranceView);
            this.queueIntervals.push(interval);
        }
        //interval enter parc
    }

    initQueue(amountOfLines) {
        let queues = [];

        for (let i = 0; i < amountOfLines; i++) {
            let queue = [];
            queues.push(queue);
        }

        localStorage.setItem('queues', JSON.stringify(queues));
    }

    addToQueue(index, visitorController, entranceView) {
        const groupPerLine = 7; 
        
        let queues = [];
        let queue = [];
        if(localStorage.queues !== undefined) {
            queues = JSON.parse(localStorage.queues);
            queue = queues[index];
        }

        if (queue.length < groupPerLine) {
            let group = visitorController.generateVisitorGroup();
            queue.push(group);
            localStorage.setItem('queues', JSON.stringify(queues));
            entranceView.renderQueue(queue, index);
        }
    }

    stopIntervals() {
        for (let interval of this.queueIntervals) {
            clearInterval(interval);
        }
    }




}