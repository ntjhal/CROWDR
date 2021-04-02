export class SimulationController {
    constructor(entrance, field, visitorController) {
        this.visitorController = visitorController;
        this.fieldView = field;
        this.entranceView = entrance;
        this.entranceView.startSimulation = this.startSimulation.bind(this);

        this.queueIntervals = [];
        this.enterIntervals = []; 
    }

    startSimulation(amountOfLines) {
        this.initQueue(amountOfLines);

        let queues = [];
        if(localStorage.queues !== undefined) {
            queues = JSON.parse(localStorage.queues)
        }

        if (this.queueIntervals != null || this.enterIntervals != null)
            this.stopIntervals();
        //interval add to queue
        for (let i = 0; i < queues.length; i++) {
            var interval = setInterval(this.addToQueue, 200, i, this.visitorController, this.entranceView);
            this.queueIntervals.push(interval);
        }
        //interval enter parc
        let enterInterval = (enterIntervals) => { //TODO ALTER to recursive timeout to random between 1 / 3 seconds.
            for (let i = 0; i < queues.length; i++) {
                var interval = setInterval(this.removeFromQueue, 1000, i, this.entranceView);
                this.enterIntervals.push(interval);
            }
        }
        
        setTimeout(enterInterval, 2000, this.enterIntervals);
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

    removeFromQueue(index, entranceView) {
        let queues = [];
        let queue = [];
        if(localStorage.queues !== undefined) {
            queues = JSON.parse(localStorage.queues);
            queue = queues[index];
        }

        let enterGroup = queue[0];
        queues[index] = queue.slice(1, queue.length);
        localStorage.setItem('queues', JSON.stringify(queues));
        
        
        entranceView.renderEnterGroup(enterGroup, index);
    } 

    stopIntervals() {
        for (let interval of this.queueIntervals) {
            clearInterval(interval);
        }
        for (let interval of this.enterIntervals) {
            clearInterval(interval);
        }
    }




}