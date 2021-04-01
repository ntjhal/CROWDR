const API_KEY = 'ae49cf85a4eba3f2c59b1f0ab5e1a222'; // this is unsafe

export class WeatherModel {
    async getWeather(city) {
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`)
            .then(res => {
                if (!res.ok) {
                    throw 'API connection failed!';
                }
                
                return res;
            })
            .then(res => res.json())
            .catch(e => {
                throw e;
            });
    }
}
