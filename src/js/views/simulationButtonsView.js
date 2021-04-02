export class SimulationButtonsView {
    constructor(canvasView) {
        this.div = document.querySelector('#sim_regionbuttons');
        this.setCurrent = null;
        this.canvasView = canvasView;
    }

    render(region) {
        let btn = document.createElement('button');
        btn.innerHTML = region.name;
        btn.classList.add("regionbtn");

        btn.addEventListener('click', (e) => {
            document.querySelector('#sim_detailspanel').innerHTML = "<h2>Details</h2>";
            
            let newRegion = this.setCurrent(region.id);
            this.canvasView.renderCanvas(newRegion);
        })

        this.div.append(btn);
    }
}