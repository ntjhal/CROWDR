export class RegionView {
    constructor(div) {
        this.div = div;
    }

    render(region) {
        let btn = document.createElement('button');
        btn.innerHTML = region.name;
        btn.classList.add("regionbtn");

        btn.addEventListener('click', (e) => {
            //TODO whatever calls are triggered by this button 
        });

        this.div.appendChild(btn);
    }
}