export class VisitorView {
    constructor(div) {
        this.div = div;
    }

    render(data) {
        this.div.querySelector('#name').textContent = `Name: ${data.firstname} ${data.lastname}`;
        this.div.querySelector('#gender').textContent = `Gender: ${data.gender}`;
        this.div.querySelector('#city').textContent = `Hometown: ${data.hometown}`
    }
}
