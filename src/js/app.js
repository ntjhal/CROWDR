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

const q1 = new ConfigQuestion('name', 'What is the name of the region?', 'text');
const q2 = new ConfigQuestion('tents', 'How many tents?', 'number');
const q3 = new ConfigQuestion('eating_stalls', 'How many eating stalls?', 'number', {
    max: 6,
    ifTent: 3
});
const q4 = new ConfigQuestion('drinking_stalls', 'How many drinking stalls?', 'number', {
    max: 4,
    ifTent: 2
});
const q5 = new ConfigQuestion('tree_high', 'How many high trees?', 'number');
const q6 = new ConfigQuestion('tree_wide', 'How many wide trees?', 'number');
const q7 = new ConfigQuestion('tree_shadow', 'How many shadow trees?', 'number');
const q8 = new ConfigQuestion('toilet_stalls', 'How many toilet stalls?', 'number', {
    max: 5
});
const q9 = new ConfigQuestion('bins', 'How many waste bins?', 'number', {
    percentOfSpace: .05
});

cfm.addQuestions([q1, q2, q3, q4, q5, q6, q7, q8, q9]);
cfc.init();
