export class SimulationFieldView {
    constructor(grid) {
        this.grid = grid;
        this.getObjectsOnGrid = null;
        this.getObject = null;
    }

    renderField(region) {
        let grid = document.getElementById('sim_grid');
        grid.innerHTML = "";

        for(let y = 1; y <= 15; y++) {
            for(let x = 1; x <= 15; x++) {
                let element = document.createElement('div');
                element.id = `{${x}-${y}}-sim`;

                grid.appendChild(element);
            }
        }

        let objectsInGrid = this.getObjectsOnGrid(region.id);
        this.renderParkObjectsInGrid(objectsInGrid, region.id);

        this.renderVisitorHolders(region);
    }

    renderParkObjectsInGrid(objectsInGrid, regionID) {
        let grid = document.getElementById('sim_grid');

        for (let po of objectsInGrid) {
            let griditem = grid.querySelector(`div[id="{${po.x}-${po.y}}-sim"]`);
          
            let object = document.createElement('div');
            object.id = `${po.type}-${po.id}-sim`;
            object.style.width = `${po.width * 50}px`;
            object.style.height = `${po.height * 50}px`;

            let image = document.createElement('img');
            image.classList.add('dragimg')
            if(po.imagesrc !== undefined) {  
                image.src = po.imagesrc;
            }
            image.draggable = false;

            object.addEventListener('click', (e) => {
                this.renderParkObjectDetails(this.getObject(regionID, po.id));
            })
        
            object.appendChild(image);
            
            if (griditem != null && object != null) {
                griditem.append(object);
            }
        }
    }

    renderParkObjectDetails(object) {
        let detailspanel = document.getElementById('sim_detailspanel');
        detailspanel.innerHTML = "<h2>Details</h2><br>";

        for (let property in object) {
            if(property != "imagesrc" && property != "x" && property != "y") 
                detailspanel.innerHTML = detailspanel.innerHTML + `<p><strong>${property}:</strong> ${object[property]}</p>`
        }
    }

    renderVisitorHolders(region) {

        let sim_squares = [];
        let currentSquares = [];
        if (localStorage.getItem('sim_squares') !== undefined) {
            sim_squares = JSON.parse(localStorage.getItem('sim_squares'));
            currentSquares = sim_squares.filter(s => s[0].regionID == region.id);
            currentSquares = currentSquares[0]
        }

        for (let y = 1; y <= 15; y++) {
            for (let x = 1; x <= 15; x++) {
                let result = currentSquares.filter(s => s.x == x && s.y == y);
                if (result.length > 0) {
                    let canvas = document.createElement('canvas');
                    let gridsquare = document.getElementById(`{${x}-${y}}-sim`);
                    canvas.width = 50;
                    canvas.height = 50;
                    canvas.classList.add('visitorCanvas')

                    canvas.addEventListener('mouseover',  () => {
                        this.renderVisitorsDetails(x, y, region.id);
                    })

                    gridsquare.append(canvas);
                }
            }
        }
    }

    renderVisitorsDetails(x, y, regionID) {
        let detailspanel = document.getElementById('sim_detailspanel');
        detailspanel.innerHTML = "<h2>Details</h2><br>";

        let sim_squares = [];
        let currentSquares = [];
        if (localStorage.getItem('sim_squares') !== undefined) {
            sim_squares = JSON.parse(localStorage.getItem('sim_squares'));
            currentSquares = sim_squares.filter(s => s[0].regionID == regionID);
            currentSquares = currentSquares[0]
        }

        let result = currentSquares.filter(s => s.x == x && s.y == y);

        if (result.length > 0) {
            let square = result[0];
            let j = 1;
            for (let group of square.visitors) {
                detailspanel.innerHTML = detailspanel.innerHTML + `<h3><strong>Group ${j}:</strong> size ${group.groupsize}</h3><br>`
            
                let i = 1;
                for (let visitor of group.visitors) {
                    detailspanel.innerHTML = detailspanel.innerHTML + `<p><strong>${i}: </strong> ${visitor.firstname} ${visitor.lastname}, ${visitor.gender}, ${visitor.age}, ${visitor.hometown}</p>`
                    i++;
                }
            
                detailspanel.innerHTML = detailspanel.innerHTML + '<br><br>'
                j++
            }
        }
    }

    updateField(regionID) {
        if (regionID !== undefined) {

            let sim_squares = [];
            let currentSquares = [];
            if (localStorage.getItem('sim_squares') !== undefined) {
                sim_squares = JSON.parse(localStorage.getItem('sim_squares'));
                currentSquares = sim_squares.filter(s => s[0].regionID == regionID);
                currentSquares = currentSquares[0]
            }

            for (let square of currentSquares) {
                if (square.currentVisitors > 0) {
                    this.updateSquare(square)
                }
            }
        }
    }

    updateSquare(square) {
        let canvas = document.getElementById(`{${square.x}-${square.y}}-sim`).querySelector('canvas');
        let ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        let img = new Image();
        img.addEventListener('load', function() {
            ctx.drawImage(img, 10, 15, 25, 25)
            
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(35, 15, 10, 0, 2 * Math.PI);
            ctx.fill();

            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.fillText(square.currentVisitors, 28, 23);
        }, false);
        img.src = 'src/images/group.png';        
    }
}