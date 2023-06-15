/**
 * Controladores para la aplicación, de esta forma separamos la funcionalidad (modelo) de la vista (página renderizada). Estos
 * controladores hacen de mediador entre estos 2 aspectos.
 */

const { raw } = require('body-parser');
const WeatherActions = require('../js/WeatherReq');
const cache = require('../js/cache');
const Cache = new cache();
var key;

    // Funciones controladores para las rutas

function root(req, res){
    res.render('homePage');
}


function consultWeather(req, res){
    if(!key){
        res.redirect('/');
        return;
    }

    res.render('consultWeather');
}


async function postKey (req, res){
    const apikey = req.body.key;
    const { consultWeather } = WeatherActions;
    let response = await consultWeather(19,-99,apikey);

    if(response.cod && response.cod === 200){
        key = apikey;
        res.send({'message':'ok'});
    }else{
        res.status(403).send({'error':'invalid ApiKey'});
    }
}


async function requestWeather(req, res){
    if(!key){
        res.redirect(200, '/');
        return;
    }

    const rawCords = req.body.coordinates;
    const coords = rawCords.split(" ");
    const coordKey = createCacheKey(rawCords);
    let weatherPack;

    if(Cache.isOnCache(coordKey)){
        if(Cache.isOlderRegister(coordKey)){
            weatherPack = await getWeatherPack(coords[0], coords[1], key);
            Cache.updateWeatherPack(coordKey, weatherPack);
            res.send(weatherPack);
            return;
        }else{
            weatherPack = Cache.getWeatherPack(coordKey);
            res.send(weatherPack);
            return; 
        }
    }

    weatherPack = await getWeatherPack(coords[0], coords[1], key);
    if(weatherPack.cod != 400){
        Cache.addToCache(coordKey, weatherPack);
        res.send(weatherPack); 
    }else{
        res.send(weatherPack); //mandamos codigo de error dentro de "weatherPack"
    }
}



     // funciones auxiliares 
async function getWeatherPack(lat, long, key){
    const { generateWeatherPack } = WeatherActions;
    
    weatherPack = await generateWeatherPack(lat, long, key);
    return weatherPack;
}


function createCacheKey(rawCords){
    let cacheKey = rawCords.replaceAll('.','');
    cacheKey = cacheKey.replaceAll(' ','');
    cacheKey = cacheKey.replaceAll('-','');
    return cacheKey;
}


module.exports = {
    root,
    postKey,
    consultWeather,
    requestWeather
}