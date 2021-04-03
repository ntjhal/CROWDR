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
        this.updateIntervals = [];
        
        this.currentVisitors = 0;
        this.maxVisitors = 0;

        this.initField();
    }

    startSimulation(amountOfLines) {
        this.currentVisitors = 0;

        this.initQueue(amountOfLines);
        this.initField();

        if (this.regionController.simCurrentRegionID !== undefined) {
            let region = this.regionController.getRegion(this.regionController.simCurrentRegionID);
            this.fieldView.renderVisitorHolders(region);
            console.log('render')
        }

        let controller = this;
        window.onbeforeunload = function () {
            controller.stopIntervals();
        }

        let queues = [];
        for (let i = 1; i <= amountOfLines; i++) {
            if(localStorage.getItem(`queue${i}`) != null) {
                queues.push(JSON.parse(localStorage.getItem(`queue${i}`)));
            }
        }


        if (this.queueIntervals != null || this.enterIntervals != null || this.updateIntervals != null)
            this.stopIntervals();
        //interval add to queue
        for (let i = 0; i < queues.length; i++) {
            var interval = setInterval(this.addToQueue, 500, i + 1, this);

            this.queueIntervals.push(interval);
        }
        //interval enter parc (acutally a recursive setTimeout function)
        for (let i = 0; i < queues.length; i++) {
            let enterInterval = () => {
                this.removeFromQueue(i+1, this.entranceView);
                
                let seconds = Math.floor(Math.random() * 3) + 1;
                this.enterIntervals[i] = setTimeout(enterInterval, seconds * 1000);
            }

            setTimeout(enterInterval, 1500);
        }
        //interval update field 
        var interval = setInterval(this.updateField, 200, this.regionController, this.fieldView)
    }

    initQueue(amountOfLines) {
        for (let i = 1; i <= amountOfLines; i++) {
            let queue = [];
            localStorage.setItem(`queue${i}`, JSON.stringify(queue));
        }
    }

    initField() {        
        if (localStorage.getItem('sim_squares') !== undefined) {
            localStorage.removeItem('sim_squares');
        }

        let regions = this.regionController.getRegions(); 
        let sim_squares = [];
        let lockedSquares = [];

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

    addToQueue(index, controller) {
        const groupPerLine = 7;
        
        let queue = [];

        controller.getData(controller).then(group => {
            if (localStorage.getItem(`queue${index}`) !== undefined) {
                queue = JSON.parse(localStorage.getItem(`queue${index}`));
            }
            if (queue.length < groupPerLine) {
                queue.push(group);
                localStorage.setItem(`queue${index}`, JSON.stringify(queue));
                controller.entranceView.renderQueue(queue, index)
            } 
        });
    }

    async getData(controller) {
        return await controller.visitorController.generateVisitorGroup();
    }
    

    removeFromQueue(index, entranceView) {
        
        let queue = [];
        if (localStorage.getItem(`queue${index}`) !== undefined) {
            queue = JSON.parse(localStorage.getItem(`queue${index}`));
        }

        let enterGroup = queue[0];

        if (enterGroup != null) {
            if ((this.currentVisitors + enterGroup.groupsize) < this.maxVisitors) {
                if(this.tryEnter(enterGroup) == true) {
                    queue = queue.slice(1, queue.length);
                    localStorage.setItem(`queue${index}`, JSON.stringify(queue));
                
                    this.currentVisitors += enterGroup.groupsize;
                    entranceView.renderEnterGroup(enterGroup, index);
                }
            }
        }
    }
    
    tryEnter(group) {
        let sim_squares = [];
        if(localStorage.sim_squares !== undefined) {
            sim_squares = JSON.parse(localStorage.sim_squares);
        }
        
        for (let arr of sim_squares) {
            let results = arr.filter(l => l.currentVisitors <= (l.maxVisitors - group.groupsize));
            
            if (results.length > 0) {
                results[0].visitors.push(group);
                results[0].currentVisitors += group.groupsize;
                localStorage.setItem('sim_squares', JSON.stringify(sim_squares));
                return true;
            }
        }

        return false;
        
    }

    updateField(regionController, fieldView) {
        let currentID = regionController.simCurrentRegionID;
        fieldView.updateField(currentID);
    }

    stopIntervals() {
        for (let interval of this.queueIntervals) {
            clearInterval(interval);
        }
        for (let interval of this.enterIntervals) {
            clearTimeout(interval);
        }
        for (let interval of this.updateIntervals) {
            clearInterval(interval);
        }
    }




}