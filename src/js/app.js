import { WeatherController } from './controllers/weatherController.js';
import { WeatherView } from './views/weatherView.js';
import { WeatherModel } from './models/weatherModel.js';
import { ConfigForm, ConfigQuestion } from './models/configForm.js';
import { ConfigFormView } from './views/configFormView.js';
import { ConfigFormController } from './controllers/configFormController.js';

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

// configuration form
const cfm = new ConfigForm();
const cfv = new ConfigFormView(document.forms.configuration);
const cfc = new ConfigFormController(cfm, cfv);

const q1 = new ConfigQuestion(1, 'Wat is de naam van de regio?', 'text');
const q2 = new ConfigQuestion(2, 'Hoeveel tenten?', 'number');
const q3 = new ConfigQuestion(3, 'Hoeveel eetkraampjes?', 'number');
const q4 = new ConfigQuestion(4, 'Hoeveel drankkraampjes?', 'number');
const q5 = new ConfigQuestion(5, 'Hoeveel bomen?', 'number');
const q6 = new ConfigQuestion(6, 'Hoeveel toiletgebouwen?', 'number');
const q7 = new ConfigQuestion(7, 'Hoeveel prullenbakken?', 'number');

cfm.addQuestions([q1, q2, q3, q4, q5, q6, q7]);
cfc.init();
