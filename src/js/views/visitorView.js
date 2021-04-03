export class VisitorView {
    constructor(div) {
        this.div = div;
        this.onShow = null;

        this.init();
    }

    init() {
        let visitorBtn = this.div.querySelector('button');

        visitorBtn.addEventListener('click', () => {
            this.onShow();
        });
    }

    render(data) {
        this.div.querySelector('#name').textContent = `Name: ${data.name.first} ${data.name.last}`;
        this.div.querySelector('#gender').textContent = `Gender: ${data.gender}`;
        this.div.querySelector('#city').textContent = `Hometown: ${data.location.city}`;
    }
}
