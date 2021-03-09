export class WeatherView {
    constructor(div) {
        this.div = div;
    }

    render(data) {
        this.div.querySelector('#city').textContent = `City: ${data.city}`;
        this.div.querySelector('#temp').textContent = `Temperature: ${data.temp} °C`;
    }
}
