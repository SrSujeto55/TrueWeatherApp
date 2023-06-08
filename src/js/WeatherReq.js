const fetch = require ('node-fetch');
const date = new Date();

/**
 * Makes the request to the api from OpenWeather and returns a response in json 
 * witch have to be handled as a promise.
 * @param {int} lat 
 * @param {int} long 
 * @param {String} apikey 
 * @returns {Promise}
 */
function consultWeather(lat, long, apikey){
   return fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&appid=' + apikey)
   .then(response => response.json());
}
/**
 * Creates a weatherPack from the api consult in {@link consultWeather} 
 * it might be theated as asyncronus code since we are using {@link consultWeather} and it is asyncrunus.
 * @param {int} lat 
 * @param {int} long 
 * @param {String} apikey 
 * @returns {object}
 */
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