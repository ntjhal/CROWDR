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

// connect to Weather API
const API_KEY = 'ae49cf85a4eba3f2c59b1f0ab5e1a222';
const weather = document.querySelector('#weather p');

const getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=nl`)
        .then(res => res.text())
        .then(data => {
            weather.textContent = data;
        })
        .catch(error => {
            alert(error);
        });
};  

getWeather('Veenendaal,nl');
