import { SimulationSquare } from "../models/simulationSquare";

export class SimulationController {
    constructor(entrance, field, visitorController, regionController, parkObjectController) {
        this.parkObjectController = parkObjectController
        this.visitorController = visitorController;
        this.regionController = regionController
        this.fieldView = field;
        this.entranceView = entrance;
        this.entranceView.startSimulation = this.startSimulation.bind(this);

        this.queueIntervals = [];
        this.enterIntervals = [];
        
        this.currentVisitors = 0;
        this.maxVisitors = 0;
    }

    startSimulation(amountOfLines) {
        this.initQueue(amountOfLines);
        this.initField();

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
        //interval enter parc (acutally a recursive setTimeout function)
        for (let i = 0; i < queues.length; i++) {
            let enterInterval = () => {
                this.removeFromQueue(i, this.entranceView);
                
                let seconds = Math.floor(Math.random() * 3) + 1;
                this.enterIntervals[i] = setTimeout(enterInterval, seconds * 1000);
            }

            enterInterval.call();
        }
    }

    initQueue(amountOfLines) {
        let queues = [];

        for (let i = 0; i < amountOfLines; i++) {
            let queue = [];
            queues.push(queue);
        }

        localStorage.setItem('queues', JSON.stringify(queues));
    }

    initField() {
        let regions = this.regionController.getRegions(); 
        let sim_squares = [];
        let lockedSquares = [];

        function findCoords(x, y) {
            return lockedSquares.x == x && lockedSquares.y == y;
        } 
        

        for (let region of regions) {
            let squares = [];
            lockedSquares = this.getLockedSquares(region);
            for (let y = 1; y <= 15; y++) {
                for (let x = 1; x <= 15; x++) {
                    let results = lockedSquares.filter(s => s.x == x && s.y == y);
                    
                    if (results.length == 0) {
                        let square = new SimulationSquare(region.id, x, y);
                        squares.push(square);
                        this.maxVisitors += 7;
                    }   
                }
            }
            sim_squares.push(squares);
        }

        localStorage.setItem('sim_squares', JSON.stringify(sim_squares));
    }

    getLockedSquares(region) {
        let coords = []
        for (let po of this.parkObjectController.getObjectsOnGrid(region.id)) {
            for (let y = po.y; y < (po.y + po.height); y++) {
                for (let x = po.x; x < (po.x + po.width); x++) {
                    let coordObj = {};
                    coordObj.x = x;
                    coordObj.y = y;
                    coords.push(coordObj);
                }
            }
        }
        return coords;
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
        if (localStorage.queues !== undefined) {
            queues = JSON.parse(localStorage.queues);
            queue = queues[index];
        }

        let enterGroup = queue[0];

        if (enterGroup != null) {
            if ((this.currentVisitors + enterGroup.groupsize) < this.maxVisitors) {
                queues[index] = queue.slice(1, queue.length);
                localStorage.setItem('queues', JSON.stringify(queues));
            
                this.currentVisitors += enterGroup.groupsize;
                entranceView.renderEnterGroup(enterGroup, index);
            }
        }
    } 

    stopIntervals() {
        for (let interval of this.queueIntervals) {
            clearInterval(interval);
        }
        for (let interval of this.enterIntervals) {
            clearTimeout(interval);
        }
    }




}