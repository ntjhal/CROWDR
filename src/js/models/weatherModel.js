import { Fetcher } from "./fetcher.js";

export class WeatherModel {
    async getWeather(city) {
        return await Fetcher.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=en`);
    }
}
