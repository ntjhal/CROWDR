export class WeatherView {
    constructor(div) {
        this.div = div;
    }

    render(data) {
        this.div.querySelector('#city').textContent = `City: ${data.city}`;
        this.div.querySelector('#temp').textContent = `Temperature: ${data.temp} °C`;

        let icon = document.createElement('img');
        icon.src = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
        icon.alt = 'Weather icon';

        let iconDiv = document.querySelector('#icon');
        let img = iconDiv.querySelector('img');

        if (img != null) {
            iconDiv.removeChild(img);
        }

        iconDiv.appendChild(icon);
    }
}
