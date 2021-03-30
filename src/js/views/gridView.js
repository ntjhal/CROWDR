export class GridView {

    renderGrid() {
        let grid = document.getElementById('grid');

        for(let x = 1; x <= 15; x++) {
            for(let y = 1; y <= 15; y++) {
                let element = document.createElement('div');
                element.classList.add('griditem');
                element.id = `{${x}-${y}}`;

                grid.appendChild(element);
            }
        }
    }

}