export class WeatherController {
    constructor(weatherView, weatherModel) {
        this.weatherView = weatherView;
        this.weatherModel = weatherModel;
    }

    getWeather(city) {
        return this.weatherModel.getWeather(city)
            .then(data => {
                if (data === undefined) {
                    throw 'Failed to fetch weather data!';
                }

                return data;
            })
            .then(data => {  
                this.weatherView.render({
                    city: city.charAt(0).toUpperCase() + city.slice(1),
                    temp: Math.floor(data.main.temp),
                    icon: data.weather[0].icon
                });
            })
            .catch(e => {
                alert(`Error: ${e}`)
            });
    }
}
