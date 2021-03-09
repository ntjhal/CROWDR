import { WeatherController } from './controllers/weatherController.js';
import { WeatherView } from './views/weatherView.js';
import { WeatherModel } from './models/weatherModel.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 320;

// draw German flag
c.fillStyle = 'black';
c.fillRect(10, 10, 480, 100);

c.fillStyle = 'red';
c.fillRect(10, 110, 480, 100);

c.fillStyle = 'yellow';
c.fillRect(10, 210, 480, 100);

// show weather
const weatherDiv = document.querySelector('#weather');

const wm = new WeatherModel();
const wv = new WeatherView(weatherDiv);
const wc = new WeatherController(wv, wm);

const input = weatherDiv.querySelector('input');
const btn = weatherDiv.querySelector('button')

btn.addEventListener('click', (e) => {
    wc.getWeather(input.value);
});
