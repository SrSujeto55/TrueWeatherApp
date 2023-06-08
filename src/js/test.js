const {generateWeatherPack} = require('./WeatherReq');
const Cache = require('./cache');

let cache = new Cache();
async function excecute(){
    const wp = await generateWeatherPack(9,19,'7753fd975ab98f5d1d730a4475ef23d6');
    cache.addToCache('MEX', wp);

    console.log(cache.getWeatherPack('MEX'));

}

excecute();


