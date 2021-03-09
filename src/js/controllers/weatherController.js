export class WeatherController {
    constructor(weatherView, weatherModel) {
        this.weatherView = weatherView;
        this.weatherModel = weatherModel;
    }

    getWeather(city) {
        this.weatherModel.getWeather(city)
            .then(w => {  
                const data = {
                    city: city,
                    temp: Math.floor(w.main.temp)
                };
        
                this.weatherView.render(data);
            })
            .catch(e => {
                alert('City not found!');
            });
        }
}
