const fetch = require ('node-fetch');
const provitionalApiKey = '7753fd975ab98f5d1d730a4475ef23d6'
const date = new Date();

function consultWeather(lat, long, apikey){
   return fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&appid=' + apikey)
   .then(response => response.json());
}

async function generateWeatherPack(lat, long, apikey){
    let weatherPack = {};
    const request = await consultWeather(lat, long, apikey);
    weatherPack['temp'] = request.main.temp;
    weatherPack['humidity'] = request.main.humidity;
    weatherPack['clouds'] = request.clouds.all;
    weatherPack['wind'] = request.wind.speed;
    weatherPack['cityName'] = request.name;
    weatherPack['reqHour'] = date.getHours();
    weatherPack['reqMin'] = date.getMinutes();

    return weatherPack;
}

module.exports = {generateWeatherPack};