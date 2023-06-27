const fetch = require ('node-fetch');

/**
 * Makes the request to the api from OpenWeather and returns a response in json 
 * witch have to be handled as a promise.
 * @param {int} lat 
 * @param {int} long 
 * @param {String} apikey 
 * @returns {Promise}
 */
async function consultWeather(lat, long, apikey){
   return fetch('https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&appid=' + apikey + '&units=metric')
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
    if(request.cod != 400){
        weatherPack['cod'] = 200;
        weatherPack['temp'] = request.main.temp;
        weatherPack['humidity'] = request.main.humidity;
        weatherPack['clouds'] = request.clouds.all;
        weatherPack['wind'] = request.wind.speed;
        weatherPack['cityName'] = request.name;
        const date = new Date();
        weatherPack['time'] = {'hour': `${date.getHours()}`, 
                                'minute':`${date.getMinutes()}`}
        return weatherPack;
    }else{
        return {'cod':400, 'error':'Something is wrong with the coords'}
    }
}

module.exports = {generateWeatherPack, consultWeather};