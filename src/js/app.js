import { WeatherController } from './controllers/weatherController.js';
import { WeatherView } from './views/weatherView.js';
import { WeatherModel } from './models/weatherModel.js';
import { VisitorController } from './controllers/visitorController.js';
import { VisitorView } from './views/visitorView.js';
import { RegionController } from './controllers/regionController.js';
import { RegionView } from './views/regionView.js';
import { ParkObject } from './models/parkObjectModel.js';
import { ParkObjectDetailView } from './views/parkObjectView.js'

document.getElementById('createmode').onclick = () => {
    document.getElementById('simulate').classList.add('hidden');
    document.getElementById('create').classList.remove('hidden');
}

document.getElementById('simulatemode').onclick = () => {
    document.getElementById('simulate').classList.remove('hidden');
    document.getElementById('create').classList.add('hidden');

}


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 750;
canvas.height = 750;
//One grid position is 50 x 50 

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
const weatherBtn = weatherDiv.querySelector('button')

weatherBtn.addEventListener('click', (e) => {
    wc.getWeather(input.value);
});

//Display a visitor
const visitorDiv = document.querySelector('#visitor');

const vv = new VisitorView(visitorDiv);
const vc = new VisitorController(vv);

const visitorBtn = visitorDiv.querySelector('button')

visitorBtn.addEventListener('click', (e) => {
    vc.generateVisitor();
});

//create a region;
const regionButtons = document.querySelector('#regionbuttons');

const rv = new RegionView(regionButtons);
const rc = new RegionController(rv);
const pov = new ParkObjectDetailView(rc);
rv.setParkObjectView(pov);
let newRegion = rc.createRegion();
if (newRegion != null) {
    newRegion.generateParkObjects(3,3,3,3,3,3)
    rc.saveRegion(newRegion);
}
rc.drawRegions();



