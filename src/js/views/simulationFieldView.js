export class SimulationFieldView {
    constructor(grid) {
        this.grid = grid;
    }

    renderField(region) {
        let grid = document.getElementById('sim_grid');
        grid.innerHTML = "";

        for(let y = 1; y <= 15; y++) {
            for(let x = 1; x <= 15; x++) {
                let element = document.createElement('div');
                element.classList.add('griditem');
                element.id = `{${x}-${y}}-sim`;

                grid.appendChild(element);
            }
        }
    }
}