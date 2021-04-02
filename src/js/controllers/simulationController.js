export class SimulationController {
    constructor(entrance, field, visitorController) {
        this.visitorController = visitorController;
        this.fieldView = field;
        this.entranceView = entrance;
        this.entranceView.startSimulation = this.startSimulation.bind(this);
    }

    startSimulation(amountOfLines) {
        this.initQueue(amountOfLines);

        let queues = [];
        if(localStorage.queues !== undefined) {
            queues = JSON.parse(localStorage.queues)
        }

        //interval add to queue
        for (let i = 0; i < queues.length; i++) {
            setInterval(this.addToQueue, 1000, i, this.visitorController, this.entranceView);
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




}